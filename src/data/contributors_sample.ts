export interface Contributor {
    id: string
    username: string
    tier: 'core' | 'active' | 'emerging'
    score: number
    email: string
    summary: string
    repos: string
}

export const contributorsData: Contributor[] = [
    {
        id: '1',
        username: '@philips77',
        tier: 'core',
        score: 85,
        email: 'a.f.nowakowski@gmail.com',
        summary:
            'Aleksander Nowakowski is a core contributor building mobile tools for Nordic Semiconductor IoT.',
        repos: 'nordicsemi/Android-nRF-Toolbox',
    },
    {
        id: '2',
        username: '@sandeepmistry',
        tier: 'active',
        score: 78,
        email: 'sandeepmistry@mastodon.social',
        summary:
            'Sandeep Mistry contributes Arduino cores and wireless libraries across semiconductor tooling.',
        repos: 'sandeepmistry/arduino-nRF5',
    },
    {
        id: '3',
        username: '@sylwester-zielinski',
        tier: 'active',
        score: 75,
        email: 'sylwester.zielinski@nordicsemi.no',
        summary:
            'Sylwester Zielinski focuses on Bluetooth and firmware-update libraries for mobile apps.',
        repos: 'nordicsemi/Android-nRF-Toolbox',
    },
    {
        id: '4',
        username: '@himalia416',
        tier: 'active',
        score: 75,
        email: 'none',
        summary: 'Himali Aryal works on Android tooling for Nordic Semiconductor products.',
        repos: 'nordicsemi/Android-nRF-Toolbox',
    },
    {
        id: '5',
        username: '@bogde',
        tier: 'active',
        score: 75,
        email: 'none',
        summary: 'bogde maintains open-source embedded tooling including the HX711 ADC library.',
        repos: 'bogde/HX711',
    },
    {
        id: '6',
        username: '@aolofsson',
        tier: 'emerging',
        score: 68,
        email: 'andreas@zeroasic.com',
        summary: 'Andreas Olofsson curates open semiconductor startups and silicon democratization.',
        repos: 'aolofsson/awesome-semiconductor-startups',
    },
    {
        id: '7',
        username: '@Kaustubh-Natuskar',
        tier: 'emerging',
        score: 65,
        email: 'kaustubhn@valuefy.com',
        summary: 'Kaustubh Natuskar builds interview and product-company opportunity resources.',
        repos: 'Kaustubh-Natuskar/moreThanFAANGM',
    },
]
