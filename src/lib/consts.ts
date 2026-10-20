// primitives then objects
// alphabetical order

import type {
	AccommodationType,
	ArrivalTime,
	DepartureTime,
	Option,
	BookingFor,
	BunkingWith,
} from './types';

export const APPS_SCRIPT_URL =
	'https://script.google.com/macros/s/AKfycbynSr8-qI_AVqN_He9PEEh8Qd6uHxiDcZwRab93EiZW6yw2WXzvxlkwUSPYtFe2eYPTEg/exec';
export const EXPECTED_PARTICIPANTS = 40;
export const SATURDAY_DINNER_RATE = 8;

export const ACCOMMODATION_TYPES: {
	name: AccommodationType;
	adultRate: number;
	teenRate: number;
	childRate: number;
	infantRate: number;
	sleeps: number;
	disabled?: boolean;
}[] = [
	{
		name: 'Powered Site',
		adultRate: 15.5,
		teenRate: 4,
		childRate: 2.5,
		infantRate: 1,
		sleeps: 20,
	},
	{
		name: 'Bunk Room',
		adultRate: 30.5,
		teenRate: 7.5,
		childRate: 4.5,
		infantRate: 2,
		sleeps: 9,
	},
	{
		name: 'Lakeside Cabin',
		adultRate: 70,
		teenRate: 17.5,
		childRate: 10.5,
		infantRate: 5,
		sleeps: 7,
	},
	{
		name: 'Family Room (Unit)',
		adultRate: 61,
		teenRate: 15.5,
		childRate: 9,
		infantRate: 4.5,
		sleeps: 13,
	},
];

export const ARRIVAL_TIMES: ArrivalTime[] = [
	'Friday Evening',
	'Saturday Morning',
	'Saturday Afternoon (Before Dinner)',
	'Saturday Evening (After Dinner)',
];

export const BOOKING_FOR_OPTIONS: Option<BookingFor>[] = [
	{ value: 'myself', label: 'Myself' },
	{ value: 'family', label: 'Myself and my spouse/family' },
];

export const BUNKING_WITH_OPTIONS: Option<BunkingWith>[] = [
	{ value: 'nobody', label: 'Nobody else' },
	{ value: 'friends', label: 'Some friends' },
	{ value: 'anyone', label: 'Open to anyone' },
];

export const DEPARTURE_TIMES: DepartureTime[] = [
	'Saturday Afternoon (Before Dinner)',
	'Saturday Evening (After Dinner)',
	'Sunday Morning',
	'Sunday Afternoon',
];

export const RATES = {
	nightly: {
		lakesideHall: 200,
	},

	daily: {
		individual: 5,
		family: 15,
	},
};
