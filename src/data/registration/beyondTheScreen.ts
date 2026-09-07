export interface PokemonOption {
  id: 'squirtle' | 'charmander' | 'bulbasaur';
  name: string;
  type: string;
  typeColor: string;
  description: string;
  imageKey: string;
  cleanImageKey?: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
  };
}

export interface ParticipationOption {
  value: 'yes' | 'maybe' | 'no';
  label: string;
  badge: string;
  subtext: string;
}

export interface DeckFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'radio' | 'pokemon-choice' | 'participation-choice';
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  pokemonOptions?: PokemonOption[];
  participationOptions?: ParticipationOption[];
}

export interface DeckCardConfig {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  artworkKey: string;
  typeAccent: string;
  typeBadge: string;
  fields: DeckFieldConfig[];
}

export interface RegistrationDeckConfig {
  eventId: string;
  eventSlug: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  cardBackKey: string;
  cards: DeckCardConfig[];
}

export const POKEMON_OPTIONS: PokemonOption[] = [
  {
    id: 'squirtle',
    name: 'SQUIRTLE',
    type: 'WATER',
    typeColor: '#1789E5',
    description: 'Tiny Turtle Pokémon • Hydro Cannon ready',
    imageKey: 'squirtle-card.png',
    cleanImageKey: 'squirtle-clean-card.png',
    stats: { hp: 60, attack: 48, defense: 65 },
  },
  {
    id: 'charmander',
    name: 'CHARMANDER',
    type: 'FIRE',
    typeColor: '#F97316',
    description: 'Lizard Pokémon • Flamethrower ready',
    imageKey: 'charmander-card.png',
    cleanImageKey: 'charmander-clean-card.png',
    stats: { hp: 70, attack: 52, defense: 43 },
  },
  {
    id: 'bulbasaur',
    name: 'BULBASAUR',
    type: 'GRASS',
    typeColor: '#65A30D',
    description: 'Seed Pokémon • Solar Beam ready',
    imageKey: 'bulbasaur-card.png',
    cleanImageKey: 'bulbasaur-clean-card.png',
    stats: { hp: 70, attack: 49, defense: 49 },
  },
];

export const PARTICIPATION_OPTIONS: ParticipationOption[] = [
  {
    value: 'yes',
    label: "I'M BATTLING!",
    badge: 'GYM CHALLENGER',
    subtext: 'Enter the tournament arena & fight for the championship',
  },
  {
    value: 'maybe',
    label: 'EXPLORING',
    badge: 'PKMN SCOUT',
    subtext: 'Scout matches, explore exhibitions & networking zones',
  },
  {
    value: 'no',
    label: 'SPECTATING',
    badge: 'CHEERING SQUAD',
    subtext: 'Join the stadium crowd, support peers & enjoy the show',
  },
];

export const DEPARTMENT_OPTIONS = [
  { label: 'Computer Science & Engineering', value: 'CSE' },
  { label: 'CSE (AI & Machine Learning)', value: 'CSE-AIML' },
  { label: 'CSE (Cyber Security & Cloud)', value: 'CSE-CYBER' },
  { label: 'Electronics & Communication (ECE)', value: 'ECE' },
  { label: 'Electrical & Electronics (EEE)', value: 'EEE' },
  { label: 'Mechanical Engineering (MECH)', value: 'MECH' },
  { label: 'Civil Engineering', value: 'CIVIL' },
  { label: 'School of Liberal Arts & Sciences', value: 'SLAS' },
  { label: 'School of Entrepreneurship & Mgmt', value: 'SEAMS' },
  { label: 'Other Department', value: 'OTHER' },
];

export const YEAR_OPTIONS = [
  { label: '1st Year (Freshman)', value: '1st Year' },
  { label: '2nd Year (Sophomore)', value: '2nd Year' },
  { label: '3rd Year (Junior)', value: '3rd Year' },
  { label: '4th Year (Senior)', value: '4th Year' },
  { label: 'Postgraduate / Alumni', value: 'Postgrad' },
];

export const GENDER_OPTIONS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Non-Binary / Other', value: 'Other' },
  { label: 'Prefer not to say', value: 'Prefer not to say' },
];

export const beyondTheScreenConfig: RegistrationDeckConfig = {
  eventId: 'beyond-the-screen',
  eventSlug: 'beyond-the-screen',
  eventTitle: 'BEYOND THE SCREEN',
  eventDate: '16 September 2026',
  eventTime: '02:30 PM — 05:30 PM',
  eventVenue: 'CV 402, SRM University-AP',
  cardBackKey: 'card-back.png',
  cards: [
    {
      id: 'trainer-profile',
      number: '01',
      title: 'TRAINER PROFILE',
      subtitle: 'Identify yourself before entering the arena.',
      artworkKey: 'squirtle-card.png',
      typeAccent: '#1789E5',
      typeBadge: 'WATER // 007',
      fields: [
        {
          name: 'fullName',
          label: 'TRAINER NAME',
          type: 'text',
          placeholder: 'e.g. Ash Ketchum / Alex Morgan',
          helperText: 'Your official full name for event accreditation',
          required: true,
        },
        {
          name: 'studentId',
          label: 'TRAINER ID / REG NO.',
          type: 'text',
          placeholder: 'e.g. AP24110010001',
          helperText: 'SRM University-AP Registration Number',
          required: true,
        },
        {
          name: 'gender',
          label: 'GENDER',
          type: 'select',
          placeholder: 'Select your gender',
          required: true,
          options: GENDER_OPTIONS,
        },
      ],
    },
    {
      id: 'comms-signal',
      number: '02',
      title: 'COMMS SIGNAL',
      subtitle: 'Establish your direct communication channel.',
      artworkKey: 'squirtle-card.png',
      typeAccent: '#1789E5',
      typeBadge: 'RADAR // SYNC',
      fields: [
        {
          name: 'email',
          label: 'EMAIL ADDRESS',
          type: 'email',
          placeholder: 'trainer@srmap.edu.in',
          helperText: 'Where we will transmit your entry token',
          required: true,
        },
        {
          name: 'contactNumber',
          label: 'CONTACT NUMBER',
          type: 'tel',
          placeholder: '+91 XXXXX XXXXX',
          helperText: 'Active WhatsApp number for emergency comms',
          required: true,
        },
      ],
    },
    {
      id: 'trainer-class',
      number: '03',
      title: 'TRAINER CLASS',
      subtitle: 'Specify your academic branch and battle readiness.',
      artworkKey: 'charmander-card.png',
      typeAccent: '#F97316',
      typeBadge: 'FIRE // 004',
      fields: [
        {
          name: 'department',
          label: 'DEPARTMENT',
          type: 'select',
          placeholder: 'Select your academic branch',
          required: true,
          options: DEPARTMENT_OPTIONS,
        },
        {
          name: 'year',
          label: 'YEAR OF STUDY',
          type: 'select',
          placeholder: 'Select your current year',
          required: true,
          options: YEAR_OPTIONS,
        },
        {
          name: 'participationInterest',
          label: 'READY FOR THE BATTLE?',
          type: 'participation-choice',
          required: true,
          participationOptions: PARTICIPATION_OPTIONS,
        },
      ],
    },
    {
      id: 'choose-partner',
      number: '04',
      title: 'CHOOSE YOUR PARTNER',
      subtitle: 'Select your companion Pokémon for the arena.',
      artworkKey: 'bulbasaur-card.png',
      typeAccent: '#65A30D',
      typeBadge: 'GRASS // 001',
      fields: [
        {
          name: 'favouritePokemon',
          label: 'SELECT YOUR STARTER',
          type: 'pokemon-choice',
          required: true,
          pokemonOptions: POKEMON_OPTIONS,
        },
      ],
    },
    {
      id: 'final-check',
      number: '05',
      title: 'FINAL CHECK',
      subtitle: 'Review your complete deck before locking registration.',
      artworkKey: 'squirtle-card.png',
      typeAccent: '#1789E5',
      typeBadge: 'DECK // LOCKED',
      fields: [],
    },
  ],
};
