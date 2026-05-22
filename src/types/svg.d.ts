declare module '*.svg?react' {
    import React = require('react')
    const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >
    export default ReactComponent
}
