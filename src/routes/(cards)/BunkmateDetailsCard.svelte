<script lang="ts">
	import FormCard from '$lib/components/FormCard.svelte';
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
		formValues.bunkmates.map(() => ({
			field: null,
			type: 'input',
			validators: [required],
		}))
	);

	function addBunkmate() {
		formControls.push({
			field: null,
			type: 'input',
			validators: [required],
		});
		formValues.bunkmates.push({ name: '', ageGroup: 'adult' });
		calculateCosts!();
	}

	function removeBunkmate(index: number) {
		formControls.splice(index, 1);
		formValues.bunkmates.splice(index, 1);
		calculateCosts!();
	}
</script>

<FormCard
	Icon={UserGroup}
	title="Bunkmate Details"
	controls={formControls}
	{active}
	{visited}
	{onback}
	{onnext}
>
	<p class="mb-2">
		Add the details for any friends who will be sharing your accommodation. Use
		the + (plus) button below to add bunkmates.
		<strong>
			Do not include yourself{formValues.bookingFor === 'family'
				? ' or your family'
				: ''}.
		</strong>
	</p>

	<div class="flex flex-col items-end gap-2">
		{#each formValues.bunkmates as _, i}
			<div class="flex gap-2 items-end self-stretch">
				<div class="flex flex-col gap-1 grow">
					{#if i === 0}
						<label for="bunkmate-{i}-name" class="label">Given Name</label>
					{/if}
					<input
						type="text"
						id="bunkmate-{i}-name"
						bind:this={formControls[i].field}
						bind:value={formValues.bunkmates[i].name}
						class="input"
					/>
				</div>
				<div class="flex flex-col gap-1">
					{#if i === 0}
						<label for="bunkmate-{i}-age" class="label">Age Group</label>
					{/if}
					<select
						id="bunkmate-{i}-age"
						bind:value={formValues.bunkmates[i].ageGroup}
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
					onclick={() => removeBunkmate(i)}
					class="btn btn-error btn-square {i === 0 ? 'btn-disabled' : ''}"
				>
					<Trash size={16} />
				</button>
			</div>
		{/each}

		<button onclick={addBunkmate} class="btn btn-success btn-square">
			<Plus size={16} />
		</button>
	</div>
</FormCard>
