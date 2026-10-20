<script lang="ts">
	import banner from '$lib/assets/form-banner.jpg';
	import FormCard from '$lib/components/FormCard.svelte';
	import type { BaseCardProps } from '$lib/types';
	import { TentTree } from '@lucide/svelte';

	let { active, visited, onnext }: BaseCardProps = $props();
</script>

<FormCard
	imageSrc={banner}
	Icon={TentTree}
	title="2027 Church Weekend Away Registration"
	{active}
	{visited}
	{onnext}
>
	<p>
		Welcome! We're excited to spend some time away together in 2027! In case you
		missed it, we'll be spending the weekend together:
	</p>
	<ul class="pl-4">
		<li>at <strong>Camp Elim</strong> in Forster</li>
		<li>from the evening of <strong>Friday 29th Jan</strong></li>
		<li>to the afternoon of <strong>Sunday 31st Jan</strong>.</li>
	</ul>
	<p>We look forward to seeing you there! Follow the prompts to register.</p>
</FormCard>
