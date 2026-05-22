import { themeQuartz } from 'ag-grid-community'

// to use myTheme in an application, pass it to the theme grid option
const vaultTheme = themeQuartz.withParams({
    accentColor: '#087AD1',
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderRadius: 2,
    browserColorScheme: 'light',
    cellHorizontalPaddingScale: 0.7,
    chromeBackgroundColor: {
        ref: 'backgroundColor',
    },
    columnBorder: false,
    fontFamily: {
        googleFont: 'Inter',
    },
    fontSize: 13,
    foregroundColor: '#555B62',
    headerBackgroundColor: '#FFFFFF',
    headerFontSize: 13,
    headerFontWeight: 400,
    headerTextColor: '#84868B',
    rowBorder: true,
    rowVerticalPaddingScale: 0.8,
    sidePanelBorder: true,
    spacing: 6,
    wrapperBorder: false,
    wrapperBorderRadius: 2,
    rowHoverColor: '#F5F5F5',
})

export default vaultTheme
