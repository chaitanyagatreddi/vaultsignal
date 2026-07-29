type StatusHelpersProps = {
    Element: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    text: string
    variant?: 'default' | 'cta' | 'secure'
}

type StatusCardProps = {
    Element: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    title: string
    amount: string
    usage: number
    activity: string
}

export { StatusHelpersProps, StatusCardProps }
