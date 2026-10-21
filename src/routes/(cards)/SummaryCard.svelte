<script lang="ts">
	import FormCard from '$lib/components/FormCard.svelte';
	import type { CardProps } from '$lib/types';
	import { ReceiptText } from '@lucide/svelte';
	import CostBreakdownModal from '../(modals)/CostBreakdownModal.svelte';

	let {
		formValues = $bindable(),
		formState,
		accommodationCosts,
		dayTripCosts,
		active,
		visited,
		onback,
		onnext,
		onsubmit,
	}: CardProps = $props();
</script>

<FormCard
	Icon={ReceiptText}
	title="Summary"
	{active}
	{visited}
	{formState}
	{onback}
	{onnext}
	{onsubmit}
>
	<p>
		The estimated total cost for the weekend for
		{formValues.bookingFor === 'family' ? 'your family' : 'you'} is
		<strong>${formValues.costs.grandTotal}</strong>.
		{#if formValues.bunkingWith === 'anyone'}
			This figure will be reduced if we are able to find bunkmates to split the
			cost with you.
		{/if}
		<button onclick={() => costBreakdownModal.showModal()} class="link label">
			How'd we arrive at that figure?
		</button>
	</p>

	<p>
		When you submit this form you will receive an email to confirm that you have
		registered. <strong>Do not pay for camp yet.</strong> When we've had a chance
		to check your registration details, you'll receive another email with your final
		total and instructions for how to pay.
	</p>

	<p>
		{#if formValues.preferredAccommodationType !== 'Powered Site'}
			Once everything is booked, we'll let you know what cabin/room number
			you'll be in.
		{/if}
		Can't wait to see you there!
	</p>

	<CostBreakdownModal
		{formValues}
		accommodationCosts={accommodationCosts!}
		dayTripCosts={dayTripCosts!}
	/>
</FormCard>
