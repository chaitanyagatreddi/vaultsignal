import { themeQuartz } from 'ag-grid-community'

// to use myTheme in an application, pass it to the theme grid option
const vaultTheme = themeQuartz.withParams({
    accentColor: '#007aff',
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderRadius: 0,
    browserColorScheme: 'light',
    cellHorizontalPaddingScale: 0.85,
    chromeBackgroundColor: {
        ref: 'backgroundColor',
    },
    columnBorder: false,
    fontFamily: {
        googleFont: 'Inter',
    },
    fontSize: 15,
    foregroundColor: '#1E1E1E',
    headerBackgroundColor: '#FFFFFF',
    headerFontSize: 13,
    headerFontWeight: 400,
    headerTextColor: '#757575',
    rowBorder: true,
    rowVerticalPaddingScale: 1,
    sidePanelBorder: true,
    spacing: 8,
    wrapperBorder: false,
    wrapperBorderRadius: 0,
    rowHoverColor: '#F5F5F5',
})

export default vaultTheme
