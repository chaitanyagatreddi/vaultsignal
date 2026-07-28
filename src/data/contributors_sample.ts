export interface Contributor {
    id: string;
    username: string;
    tier: 'active' | 'inactive';
    score: number;
    email: string;
    summary: string;
    repos: string;
}

export const contributorsData: Contributor[] = [
    {
        id: '1',
        username: '@sandeepmistry',
        tier: 'active',
        score: 78,
        email: 'sandeepmistry@mastodon.social',
        summary: 'Sandeep Mistry is a contributor in the cybersecurity and semiconductor space, primarily focusing on Arduino-based projects.',
        repos: 'sandeepmistry/arduino-nRF5'
    },
    {
        id: '2',
        username: '@sylwester-zielinski',
        tier: 'active',
        score: 75,
        email: 'sylwester.zielinski@nordicsemi.no',
        summary: 'Sylwester Zielinski is a contributor focused on developing libraries for Bluetooth and firmware updates in mobile applications.',
        repos: 'nordicsemi/Android-nRF-Toolbox'
    },
    {
        id: '3',
        username: '@philips77',
        tier: 'active',
        score: 75,
        email: 'a.f.nowakowski@gmail.com',
        summary: 'Aleksander Nowakowski is a contributor focused on mobile development tools for Nordic Semiconductors IoT solutions.',
        repos: 'nordicsemi/Android-nRF-Toolbox'
    },
    {
        id: '4',
        username: '@himalia416',
        tier: 'active',
        score: 75,
        email: 'none',
        summary: 'Himali Aryal is a contributor focused on cybersecurity and semiconductor tools.',
        repos: 'nordicsemi/Android-nRF-Toolbox'
    },
    {
        id: '5',
        username: '@bogde',
        tier: 'active',
        score: 75,
        email: 'none',
        summary: 'bogde is a contributor focused on open-source tools for semiconductor technology and cybersecurity.',
        repos: 'bogde/HX711'
    }
];
