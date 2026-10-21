<script lang="ts">
	import FormCard from '$lib/components/FormCard.svelte';
	import { showToast } from '$lib/services/toasts.svelte';
	import type { CardProps, FormControl } from '$lib/types';
	import { required } from '$lib/validators';
	import { Plus, Trash, UserGroup } from '@lucide/svelte';

	let {
		formValues = $bindable(),
		calculateCosts,
		active,
		visited,
		onback,
		onnext,
	}: CardProps = $props();

	const formControls: FormControl[] = $state(
		formValues.familyMembers.map(() => ({
			field: null,
			type: 'input',
			validators: [required],
		}))
	);

	function addFamilyMember() {
		formControls.push({
			field: null,
			type: 'input',
			validators: [required],
		});
		formValues.familyMembers.push({ name: '', ageGroup: 'adult' });
		calculateCosts!();
	}

	function removeFamilyMember(index: number) {
		formControls.splice(index, 1);
		formValues.familyMembers.splice(index, 1);
		calculateCosts!();
	}

	function validateSelfNotIncluded(): boolean {
		for (const control of formControls) {
			const value = (control.field! as HTMLInputElement).value;
			if (!value.includes(formValues.givenName)) continue;

			control.field!.classList.add('input-error');
			showToast({
				message: 'Please do not include yourself.',
				type: 'warning',
			});

			return false;
		}

		return true;
	}
</script>

<FormCard
	Icon={UserGroup}
	title="Family Details"
	controls={formControls}
	{active}
	{visited}
	{onback}
	onnext={() => {
		if (validateSelfNotIncluded()) onnext?.();
	}}
>
	<p class="mb-2">
		Add the details for your spouse/family here. Use the + (plus) button below
		to add family members. <strong>Do not include yourself.</strong>
	</p>

	<div class="flex flex-col items-end gap-2">
		{#each formValues.familyMembers as _, i}
			<div class="flex gap-2 items-end self-stretch">
				<div class="flex flex-col gap-1 grow">
					{#if i === 0}
						<label for="family-member-{i}-name" class="label">Given Name</label>
					{/if}
					<input
						type="text"
						id="family-member-{i}-name"
						bind:this={formControls[i].field}
						bind:value={formValues.familyMembers[i].name}
						class="input"
					/>
				</div>
				<div class="flex flex-col gap-1">
					{#if i === 0}
						<label for="family-member-{i}-age" class="label">Age Group</label>
					{/if}
					<select
						id="family-member-{i}-age"
						bind:value={formValues.familyMembers[i].ageGroup}
						onchange={() => calculateCosts!()}
						class="select min-w-32"
					>
						<option value="adult">Adult</option>
						<option value="teen">Year 7-12</option>
						<option value="child">Year K-6</option>
						<option value="infant">Infant</option>
					</select>
				</div>
				<button
					onclick={() => removeFamilyMember(i)}
					class="btn btn-error btn-square {i === 0 ? 'btn-disabled' : ''}"
				>
					<Trash size={16} />
				</button>
			</div>
		{/each}

		<button onclick={addFamilyMember} class="btn btn-success btn-square">
			<Plus size={16} />
		</button>
	</div>
</FormCard>
