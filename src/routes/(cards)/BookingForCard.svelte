<script lang="ts">
	import FormCard from '$lib/components/FormCard.svelte';
	import { BOOKING_FOR_OPTIONS } from '$lib/consts';
	import type { CardProps, FormControl } from '$lib/types';
	import { required } from '$lib/validators';
	import { Ticket } from '@lucide/svelte';

	let {
		formValues = $bindable(),
		calculateCosts,
		active,
		visited,
		onback,
		onnext,
	}: CardProps = $props();

	const formControls: { [id: string]: FormControl } = $state({
		'booking-for': {
			field: null,
			type: 'radio',
			validators: [required],
		},
	});
</script>

<FormCard
	Icon={Ticket}
	title="Who I'm Booking For"
	controls={Object.values(formControls)}
	{active}
	{visited}
	{onback}
	{onnext}
>
	<p class="mb-2">
		If you select the second option, you'll be asked to provide the names of
		your family members next.
	</p>

	<div
		bind:this={formControls['booking-for'].field}
		class="flex flex-col gap-2 mb-2"
	>
		<p class="label">I am booking accommodation/site use for...</p>

		{#each BOOKING_FOR_OPTIONS as option}
			<div class="flex gap-2">
				<input
					type="radio"
					id={option.value}
					name="booking-for"
					bind:group={formValues.bookingFor}
					onchange={() => calculateCosts!()}
					value={option.value}
					class="radio"
				/>
				<label for="booking-for-{option.value}">{option.label}</label>
			</div>
		{/each}
	</div>
</FormCard>
