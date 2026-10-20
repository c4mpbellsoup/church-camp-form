<script lang="ts">
	import FormCard from '$lib/components/FormCard.svelte';
	import { BUNKING_WITH_OPTIONS } from '$lib/consts';
	import type { CardProps } from '$lib/types';
	import { Bed } from '@lucide/svelte';

	let {
		formValues = $bindable(),
		calculateCosts,
		active,
		visited,
		onback,
		onnext,
	}: CardProps = $props();

	let singularPlural: {
		possessive: string;
		pronoun: string;
		pronounCaps: string;
		verb: string;
		joinedVerb: string;
	} = $derived(
		!formValues.bookingFor || formValues.bookingFor === 'myself'
			? {
					possessive: 'my',
					pronoun: 'I',
					pronounCaps: 'I',
					verb: 'am',
					joinedVerb: "I'm",
				}
			: {
					possessive: 'our',
					pronoun: 'we',
					pronounCaps: 'We',
					verb: 'are',
					joinedVerb: "We're",
				}
	);
</script>

<FormCard
	Icon={Bed}
	title="Who {singularPlural.joinedVerb} Bunking With"
	{active}
	{visited}
	{onback}
	{onnext}
>
	<p>
		If you would like to share your room with some friends
		{formValues.bookingFor === 'family' ? ' (in addition to your family)' : ''}
		you can specify that here. The costs of accommodation will be automatically calculated
		and split between all parties sharing a room/site.
	</p>
	<p class="mb-2">
		If you select the second option, you'll be asked to provide the names of
		your bunkmates next.
	</p>

	<div class="flex flex-col gap-2">
		<p class="label">
			{singularPlural.pronounCaps} will share {singularPlural.possessive}
			accommodation with...
		</p>

		{#each BUNKING_WITH_OPTIONS as option}
			<div class="flex gap-2">
				<input
					type="radio"
					id={option.value}
					name="bunking-with"
					bind:group={formValues.bunkingWith}
					onchange={() => calculateCosts!()}
					value={option.value}
					class="radio"
				/>
				<div class="flex flex-col">
					<label for="bunking-with-{option.value}">{option.label}</label>
					<span class="label text-xs whitespace-normal">
						{#if option.value === 'friends'}
							{singularPlural.pronounCaps}'ve organised a group of friends who
							{singularPlural.pronoun} will share
							{singularPlural.possessive} accommodation with.
						{:else if option.value === 'anyone'}
							{singularPlural.pronounCaps}'ve not organised a group, but
							{singularPlural.pronoun}
							{singularPlural.verb} willing to share
							{singularPlural.possessive} accommodation with others if needed.
						{/if}
					</span>
				</div>
			</div>
		{/each}
	</div>
</FormCard>
