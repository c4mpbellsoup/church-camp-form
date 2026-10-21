<script lang="ts">
	import FormCard from '$lib/components/FormCard.svelte';
	import {
		ACCOMMODATION_TYPES,
		ARRIVAL_TIMES,
		DEPARTURE_TIMES,
	} from '$lib/consts';
	import type { CardProps, FormControl } from '$lib/types';
	import { required } from '$lib/validators';
	import { BadgeQuestionMark, Tent } from '@lucide/svelte';

	let {
		formValues = $bindable(),
		accommodationCosts,
		calculateCosts,
		active,
		visited,
		onback,
		onnext,
	}: CardProps = $props();

	let bunkmatesCount = $derived(
		formValues.bunkingWith === 'friends' ? formValues.bunkmates.length : 0
	);

	let familyCount = $derived(
		formValues.bookingFor === 'family' ? formValues.familyMembers.length : 0
	);

	let partySize = $derived(1 + familyCount + bunkmatesCount);

	let accommodationOptionsHidden = $derived.by(() => {
		const roomSizes = ACCOMMODATION_TYPES.map((t) => t.sleeps);
		return partySize > Math.min(...roomSizes);
	});

	let dayTrip = $derived(formValues.stayingNights === 0);

	$effect(() => {
		if (dayTrip) {
			const field = formControls['accommodation-type']
				.field as HTMLSelectElement;
			if (!field) return;
			field.value = '';
			formValues.preferredAccommodationType = '';
		}
	});

	let formControls: { [id: string]: FormControl } = $state({
		'accommodation-type': {
			field: null,
			type: 'select',
			validators: [required],
		},
	});
</script>

<FormCard
	Icon={Tent}
	title="Accommodation"
	controls={Object.values(formControls)}
	{active}
	{visited}
	{onback}
	{onnext}
>
	<p class="mb-2">
		Fill out the fields below to select your accommodation preference and
		receive a cost estimate for your accommodation. Final costs will be provided
		at the end of the form.
	</p>

	<div class="flex flex-col gap-1">
		<p class="label whitespace-normal">Arrival/Departure</p>

		<label class="select mb-1">
			<span class="label">arrive</span>
			<select
				id="arrival-time"
				bind:value={formValues.arrivalTime}
				onchange={() => calculateCosts!()}
				class="select"
			>
				{#each ARRIVAL_TIMES as time}
					<option value={time}>{time}</option>
				{/each}
			</select>
		</label>

		<label class="select">
			<span class="label">depart</span>
			<select
				id="departure-time"
				bind:value={formValues.departureTime}
				onchange={() => calculateCosts!()}
				class="select"
			>
				{#each DEPARTURE_TIMES as time}
					<option value={time}>{time}</option>
				{/each}
			</select>
		</label>
	</div>

	<div class="flex flex-col gap-1">
		<div class="flex items-center gap-1">
			<label for="accommodation-type" class="label">Accommodation Type</label>
			<div class="tooltip">
				<div class="tooltip-content text-left">
					<p class="mb-2">
						More information can be found on the Camp Elim website but the key
						differences between the accommodation types are:
					</p>

					<ul class="list-disc pl-4">
						<li class="mb-1">
							<strong>Powered Site</strong> - campsite, shared camp bathroom + fridge
						</li>
						<li class="mb-1">
							<strong>Bunk Room</strong> - private bathroom, shared camp fridge, sleeps
							9
						</li>
						<li class="mb-1">
							<strong>Lakeside Cabin</strong> - private kitchen, bathroom + living
							space, sleeps 7
						</li>
						<li>
							<strong>Family Room (Unit)</strong> - private kitchenette, bathroom
							+ living space, sleeps 13
						</li>
					</ul>
				</div>
				<BadgeQuestionMark size={16} />
			</div>
		</div>

		<select
			id="accommodation-type"
			bind:this={formControls['accommodation-type'].field}
			bind:value={formValues.preferredAccommodationType}
			onchange={() => calculateCosts!()}
			class="select"
			disabled={dayTrip}
		>
			{#each ACCOMMODATION_TYPES as type}
				<option
					value={type.name}
					disabled={type.disabled || type.sleeps < partySize}
				>
					{type.name}
				</option>
			{/each}
		</select>

		<p
			class="label whitespace-normal"
			class:hidden={!accommodationOptionsHidden && !dayTrip}
		>
			{#if dayTrip}
				No need to select accommodation if you're just planning a day trip!
			{:else}
				Some accommodation types are unavailable due to the size of your party.
			{/if}
		</p>
	</div>

	{#if formValues.preferredAccommodationType}
		<p class="mt-4">
			The total cost of accommodation will be
			<strong>${accommodationCosts!.total.total}</strong>. (${accommodationCosts!
				.total.nightly.total}/night)
			{#if bunkmatesCount > 0}
				<br />Your share of that cost will be
				<strong>${accommodationCosts!.split.total}</strong>. (${accommodationCosts!
					.split.nightly.total}/night)
			{/if}
		</p>
	{/if}
</FormCard>
