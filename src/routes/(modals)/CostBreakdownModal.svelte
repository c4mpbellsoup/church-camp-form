<script lang="ts">
	import {
		ACCOMMODATION_TYPES,
		EXPECTED_PARTICIPANTS,
		RATES,
		SATURDAY_DINNER_RATE,
	} from '$lib/consts';
	import type {
		AccommodationCosts,
		DayTripCosts,
		FormValues,
	} from '$lib/types';
	import { X } from '@lucide/svelte';

	let {
		formValues,
		accommodationCosts,
		dayTripCosts,
	}: {
		formValues: FormValues;
		accommodationCosts: AccommodationCosts;
		dayTripCosts: DayTripCosts;
	} = $props();

	const totalCosts = $derived(accommodationCosts!.total);
	const myTotalCosts = $derived(accommodationCosts!.split);
	const bunkmates = $derived(formValues.bunkingWith === 'friends');

	const familySize = $derived(
		formValues.bookingFor === 'family' ? formValues.familyMembers.length + 1 : 1
	);

	const room = $derived(
		ACCOMMODATION_TYPES.find(
			(t) => t.name === formValues.preferredAccommodationType
		)
	);

	// const lakesideHallRate = $derived(
	// 	(RATES.nightly.lakesideHall * 2) / EXPECTED_PARTICIPANTS
	// );

	// const lakesideHallTotal = $derived(lakesideHallRate * familySize);
	const saturdayDinnerTotal = $derived(
		SATURDAY_DINNER_RATE * (formValues.sharingDinner ? familySize : 0)
	);

	const toCost = (cost: number): string => (cost ? `$${cost}` : '-');
</script>

<dialog id="costBreakdownModal" class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-square btn-ghost absolute right-4 top-4">
				<X size={16} />
			</button>
		</form>
		<h3 class="text-lg font-bold mb-4">Cost Breakdown</h3>
		<div class="overflow-x-auto rounded-box border border-base-300">
			<table class="table table-sm sm:table-md">
				<colgroup>
					<col style="min-width: 8rem" />
					<col />
					<col />
					<col />
					<col style="min-width: 6rem;" />
				</colgroup>
				<tbody>
					<tr class="bg-base-200">
						<th>Item</th>
						<th>Rate</th>
						<th>Qty</th>
						<th>Subtotal</th>
						{#if bunkmates}
							<th>Your Share</th>
						{/if}
					</tr>
					<tr class="bg-base-200">
						<td colspan={bunkmates ? 5 : 4}>
							<strong>Accommodation / Site Use</strong><br />
							These rates are for a {formValues.preferredAccommodationType}.
							{#if bunkmates}
								Subtotal is calculated based on all occupants and is then split
								into individual shares. You only need to pay your share.
							{/if}
						</td>
					</tr>
					{#if formValues.stayingNights > 0}
						<tr>
							<td>Per Adult</td>
							<td>{toCost(room!.adultRate)}</td>
							<td>{accommodationCosts!.numAdults || '-'}</td>
							<td class={{ 'bg-primary/5': !bunkmates }}
								>{toCost(totalCosts.nightly.forAdults)}</td
							>
							{#if bunkmates}
								<td class="bg-primary/5"
									>{toCost(myTotalCosts.nightly.forAdults)}</td
								>
							{/if}
						</tr>
						<tr>
							<td>Per Teen</td>
							<td>{toCost(room!.teenRate)}</td>
							<td>{accommodationCosts!.numTeens || '-'}</td>
							<td class={{ 'bg-primary/5': !bunkmates }}
								>{toCost(totalCosts.nightly.forTeens)}</td
							>
							{#if bunkmates}
								<td class="bg-primary/5"
									>{toCost(myTotalCosts.nightly.forTeens)}</td
								>
							{/if}
						</tr>
						<tr>
							<td>Per Child</td>
							<td>{toCost(room!.childRate)}</td>
							<td>{accommodationCosts!.numChildren || '-'}</td>
							<td class={{ 'bg-primary/5': !bunkmates }}
								>{toCost(totalCosts.nightly.forChildren)}</td
							>
							{#if bunkmates}
								<td class="bg-primary/5"
									>{toCost(myTotalCosts.nightly.forChildren)}</td
								>
							{/if}
						</tr>
						<tr>
							<td>Per Infant</td>
							<td>{toCost(room!.infantRate)}</td>
							<td>{accommodationCosts!.numInfants || '-'}</td>
							<td class={{ 'bg-primary/5': !bunkmates }}
								>{toCost(totalCosts.nightly.forInfants)}</td
							>
							{#if bunkmates}
								<td class="bg-primary/5"
									>{toCost(myTotalCosts.nightly.forInfants)}</td
								>
							{/if}
						</tr>
						<tr>
							<th colspan="3">Per Night</th>
							<th class={{ 'bg-primary/5': !bunkmates }}
								>{toCost(totalCosts.nightly.total)}</th
							>
							{#if bunkmates}
								<th class="bg-primary/5"
									>{toCost(myTotalCosts.nightly.total)}</th
								>
							{/if}
						</tr>
						<tr>
							<th colspan="3">
								Total ({formValues.stayingNights} Night{formValues.stayingNights !==
								1
									? 's'
									: ''})
							</th>
							<th class={{ 'bg-primary/5 border border-primary': !bunkmates }}
								>${totalCosts.total}</th
							>
							{#if bunkmates}
								<th class="bg-primary/5 border border-primary"
									>${myTotalCosts.total}</th
								>
							{/if}
						</tr>
					{:else}
						<tr>
							<td>Day Trip (individual)</td>
							<td>{toCost(RATES.daily.individual)}</td>
							<td>{dayTripCosts.individualsCount || '-'}</td>
							<td class="bg-primary/5">
								{toCost(dayTripCosts.individualsCost)}
							</td>
						</tr>
						<tr>
							<td>Day Trip (family)</td>
							<td>{toCost(RATES.daily.family)}</td>
							<td>{dayTripCosts.familiesCount || '-'}</td>
							<td class="bg-primary/5">
								{toCost(dayTripCosts.familiesCost)}
							</td>
						</tr>
						<tr>
							<th colspan="3">Total</th>
							<th class={{ 'bg-primary/5 border border-primary': !bunkmates }}>
								${dayTripCosts.total}
							</th>
						</tr>
					{/if}
					<tr class="bg-base-200">
						<td colspan={bunkmates ? 5 : 4}>
							<strong>Shared</strong><br />
							<!-- The Lakeside Hall booking cost is estimated based on expected attendance. -->
							Saturday dinner is a per-person contribution.
						</td>
					</tr>
					<!-- <tr>
						<td>Lakeside Hall</td>
						<td>{toCost(lakesideHallRate)}</td>
						<td>{familySize}</td>
						<td></td>
						<td class="bg-primary/5">
							{toCost(lakesideHallTotal)}
						</td>
					</tr> -->
					<tr>
						<td>Saturday Dinner</td>
						<td>{toCost(SATURDAY_DINNER_RATE)}</td>
						<td>{formValues.sharingDinner ? familySize : '-'}</td>
						{#if bunkmates}<td></td>{/if}
						<td class="bg-primary/5">
							{toCost(saturdayDinnerTotal)}
						</td>
					</tr>
					<!-- <tr>
						<th colspan={bunkmates ? 4 : 3}>Total</th>
						<th class="bg-primary/5 border border-primary">
							${formValues.costs.sharedTotal}
						</th>
					</tr> -->
					<tr>
						<th colspan={bunkmates ? 4 : 3}>Grand Total</th>
						<th class="bg-primary border border-primary text-primary-content">
							${formValues.costs.grandTotal}
						</th>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</dialog>
