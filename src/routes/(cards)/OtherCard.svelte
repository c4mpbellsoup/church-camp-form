<script lang="ts">
	import FormCard from '$lib/components/FormCard.svelte';
	import type { CardProps } from '$lib/types';
	import { Utensils } from '@lucide/svelte';

	let {
		formValues = $bindable(),
		active,
		visited,
		onback,
		onnext,
	}: CardProps = $props();
</script>

<FormCard Icon={Utensils} title="Other" {active} {visited} {onback} {onnext}>
	<div class="flex flex-col gap-2 mb-2">
		<p class="label">Financial Assistance</p>

		<div class="flex gap-2">
			<input
				type="checkbox"
				id="offering-financial-assistance"
				bind:checked={formValues.offeringFinancialAssistance}
				onchange={() => (formValues.acceptingFinancialAssistance = false)}
				class="checkbox"
			/>
			<label for="offering-financial-assistance"
				>I'm happy to offer financial assistance</label
			>
		</div>

		<div class="flex gap-2">
			<input
				type="checkbox"
				id="accepting-financial-assistance"
				bind:checked={formValues.acceptingFinancialAssistance}
				onchange={() => (formValues.offeringFinancialAssistance = false)}
				class="checkbox"
			/>
			<label for="accepting-financial-assistance"
				>I need financial assistance</label
			>
		</div>
	</div>

	<div class="flex flex-col gap-2 mb-2">
		<p class="label">Carpooling</p>

		<div class="flex gap-2">
			<input
				type="checkbox"
				id="offering-lift"
				bind:checked={formValues.offeringLift}
				onchange={() => (formValues.acceptingLift = false)}
				class="checkbox"
			/>
			<label for="offering-lift">I'm happy to offer a lift</label>
		</div>

		<div class="flex gap-2">
			<input
				type="checkbox"
				id="accepting-lift"
				bind:checked={formValues.acceptingLift}
				onchange={() => (formValues.offeringLift = false)}
				class="checkbox"
			/>
			<label for="accepting-lift">I need a lift</label>
		</div>
	</div>

	<div class="flex flex-col gap-1">
		<label for="dietary-requirements" class="label">Dietary Requirements</label>
		<input
			type="text"
			id="dietary-requirements"
			bind:value={formValues.dietaryRequirements}
			class="input"
		/>
		<p class="label whitespace-normal">
			This applies to the catered meal on Saturday night. All other meals will
			be self-catered.
		</p>
	</div>

	<div class="flex flex-col gap-1">
		<label for="notes" class="label">Anything else you'd like us to know?</label
		>
		<textarea
			id="notes"
			bind:value={formValues.notes}
			class="textarea w-full resize-none"></textarea>
	</div>
</FormCard>
