// types then interfaces
// alphabetical order

export type AccommodationType =
	'Powered Site' | 'Bunk Room' | 'Lakeside Cabin' | 'Family Room (Unit)';

export type ArrivalTime =
	| 'Friday Evening'
	| 'Saturday Morning'
	| 'Saturday Afternoon (Before Dinner)'
	| 'Saturday Evening (After Dinner)';

export type DepartureTime =
	| 'Saturday Afternoon (Before Dinner)'
	| 'Saturday Evening (After Dinner)'
	| 'Sunday Morning'
	| 'Sunday Afternoon';

export type BookingFor = 'myself' | 'family';

export type Validator = (value: string) => string | null;

export type BunkingWith = 'nobody' | 'friends' | 'anyone';

export interface AccommodationCosts {
	numAdults: number;
	numTeens: number;
	numChildren: number;
	numInfants: number;
	total: CostBreakdown;
	split: CostBreakdown;
}

export interface BaseCardProps {
	active: boolean;
	visited: boolean;
	formState?: FormState;
	onback?: () => void;
	onnext?: () => void;
	onsubmit?: () => void;
}

export interface CardProps extends BaseCardProps {
	formValues: FormValues;
	formState?: FormState;
	accommodationCosts?: AccommodationCosts;
	dayTripCosts?: DayTripCosts;
	calculateCosts?: () => void;
}

export interface DayTripCosts {
	individualsCount: number;
	individualsCost: number;
	familiesCount: number;
	familiesCost: number;
	total: number;
}

export interface FormControl {
	field:
		| HTMLInputElement
		| HTMLSelectElement
		| HTMLLabelElement
		| HTMLDivElement
		| null;
	type: 'input' | 'select' | 'radio';
	validators: Validator[];
	valid?: boolean;
}

export interface FormState {
	stepIndex: number;
	isLoading: boolean;
}

export interface FormValues {
	givenName: string;
	familyName: string;
	emailAddress: string;
	mobileNumber: string;
	bookingFor: BookingFor | '';
	bunkingWith: BunkingWith | '';
	familyMembers: Bunkmate[];
	bunkmates: Bunkmate[];
	arrivalTime: ArrivalTime;
	departureTime: DepartureTime;
	stayingNights: number;
	sharingDinner: boolean;
	preferredAccommodationType: AccommodationType | '';
	costs: {
		accommodationTotal: number;
		accommodationSplit: number;
		dayTripTotal: number;
		sharedTotal: number;
		grandTotal: number;
	};
	offeringFinancialAssistance: boolean;
	acceptingFinancialAssistance: boolean;
	offeringLift: boolean;
	acceptingLift: boolean;
	dietaryRequirements: string;
	notes: string;
}

export interface Option<T> {
	value: T;
	label: string;
}

interface Bunkmate {
	name: string;
	ageGroup: 'adult' | 'teen' | 'child' | 'infant';
}

interface CostBreakdown {
	nightly: {
		forAdults: number;
		forTeens: number;
		forChildren: number;
		forInfants: number;
		total: number; // total per night
	};
	total: number; // total for stay
}
