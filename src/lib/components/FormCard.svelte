<script lang="ts">
	import { showToast } from '$lib/services/toasts.svelte';
	import { type IconProps } from '@lucide/svelte';
	import { type Component, type Snippet } from 'svelte';
	import type { Action } from 'svelte/action';
	import type { BaseCardProps, FormControl } from '../types';

	let {
		imageSrc,
		Icon,
		title,
		controls,
		children,
		active,
		visited,
		formState,
		onback,
		onnext,
		onsubmit,
	}: {
		imageSrc?: string;
		Icon: Component<IconProps>;
		title: string;
		controls?: FormControl[];
		children?: Snippet;
	} & BaseCardProps = $props();

	function validateForm(): boolean {
		if (!controls) return true;

		let firstValidationError = '';
		controls.forEach((control) => {
			const validationError = validateControl(control);
			if (validationError && !firstValidationError) {
				firstValidationError = validationError;
			}
		});

		if (firstValidationError) {
			showToast({ message: firstValidationError, type: 'warning' });
			return false;
		}

		return true;
	}

	function validateControl(control: FormControl): string | null {
		let radioEls: HTMLInputElement[] = [];
		if (control.type === 'radio') {
			radioEls = Array.from(
				control.field!.querySelectorAll('input[type="radio"]')
			);
		}

		let field: HTMLSelectElement;
		let value: string;
		let errorClass: string;
		switch (control.type) {
			case 'input':
				value = (control.field! as HTMLInputElement).value;
				errorClass = 'input-error';
				break;
			case 'select':
				field = control.field! as HTMLSelectElement;
				if (field.disabled) return null;
				value = field.value;
				errorClass = 'select-error';
				break;
			case 'radio':
				value = radioEls.find((r) => r.checked)?.value ?? '';
				errorClass = 'radio-error';
				break;
			default:
				throw new Error(`Unknown control type: ${control.type}`);
		}

		control.type === 'radio'
			? radioEls.forEach((r) => r.classList.remove('radio-error'))
			: control.field!.classList.remove(errorClass);

		for (const validator of control.validators) {
			const validationError = validator(value);
			if (validationError) {
				control.type === 'radio'
					? radioEls.forEach((r) => r.classList.add('radio-error'))
					: control.field!.classList.add(errorClass);
				return validationError;
			}
		}

		return null;
	}

	const onFormMount: Action = (_) => {
		$effect(() => {
			if (!controls) return;
			const controller = new AbortController();

			controls.forEach((control) => {
				switch (control.type) {
					case 'input':
						control.field!.addEventListener(
							'input',
							() => control.field!.classList.remove('input-error'),
							{ signal: controller.signal }
						);
						break;
					case 'select':
						control.field!.addEventListener(
							'change',
							() => control.field!.classList.remove('select-error'),
							{ signal: controller.signal }
						);
						break;
					case 'radio':
						const radioEls = Array.from(
							control.field!.querySelectorAll('input[type="radio"]')
						);

						radioEls.forEach((r) =>
							r.addEventListener(
								'change',
								() =>
									radioEls.forEach((r) => {
										r.classList.remove('radio-error');
									}),
								{ signal: controller.signal }
							)
						);
				}
			});

			return () => controller.abort();
		});
	};
</script>

<div class="card-wrapper w-lg max-w-full" class:active class:visited>
	<div
		class="card w-lg max-w-full relative bg-base-100"
		class:shadow-md={active}
		class:bg-base-200={!active}
	>
		{#if imageSrc}
			<figure>
				<img src={imageSrc} alt={title} />
			</figure>
		{/if}
		<div class="card-body gap-4 relative">
			<div class="step invisible md:visible" class:shadow-sm={active}>
				{#if active}<Icon size="16" />{/if}
			</div>
			<div class="step-bar invisible md:visible"></div>
			<h2 class="card-title">{title}</h2>
			{#if active}
				{@render children?.()}
				<div use:onFormMount></div>

				<div class="flex flex-row self-end gap-2 mt-4">
					{#if onback}
						<button onclick={onback} disabled={formState?.isLoading} class="btn"
							>Back</button
						>
					{/if}

					{#if onnext}
						<button
							onclick={() => {
								if (validateForm()) onnext();
							}}
							disabled={formState?.isLoading}
							class="btn btn-primary">Next</button
						>
					{/if}

					{#if onsubmit}
						<button
							onclick={() => {
								if (validateForm()) onsubmit();
							}}
							disabled={formState?.isLoading}
							class="btn btn-primary"
						>
							{#if formState?.isLoading}
								<span class="loading loading-spinner"></span>
							{:else}
								Submit
							{/if}
						</button>
					{/if}
				</div>
			{/if}
		</div>

		<!-- catches the scroll -->
		<div class="scroll-catch"></div>
	</div>
</div>

<style>
	.card-wrapper:last-of-type {
		min-height: calc(100vh - 3rem);
	}

	.scroll-catch {
		position: absolute;
		top: -2rem;
	}

	.step {
		align-items: center;
		background-color: var(--color-base-content);
		border-radius: 50%;
		color: var(--color-primary-content);
		display: flex;
		height: 1rem;
		justify-content: center;
		left: -2.5rem;
		opacity: 0.1;
		position: absolute;
		top: 1.75rem;
		width: 1rem;
		z-index: 2;
	}

	.active .step {
		background-color: var(--color-primary);
		height: 2rem;
		left: -3rem;
		opacity: 1;
		top: 1.25rem;
		width: 2rem;
	}

	.step-bar {
		border-left: 2px dashed var(--color-base-content);
		height: 100%;
		left: -2rem;
		opacity: 0.1;
		position: absolute;
		top: 2.75rem;
		z-index: 1;
	}

	.card-wrapper:last-of-type .step-bar {
		display: none;
	}

	.visited .step {
		background-color: var(--color-primary);
		opacity: 1;
	}

	.visited .step-bar {
		border-left: 2px solid var(--color-primary);
		opacity: 1;
	}
</style>
