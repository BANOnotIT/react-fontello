/**
 * Created by BANO.notIT on 08.07.18.
 * @flow
 */

import * as React from 'react'


type GlyphName = string

type Glyph = {
    css: GlyphName,
    code: number,
}

type Config = {
    css_prefix_text: string,
    glyphs: Glyph[]
}

type GlyphMap = { [key: GlyphName]: string }


type Props = { className?: string, children?: string, glyph?: string }


function fabric(config: Config, baseClassName: string = config.css_prefix_text): React.StatelessFunctionalComponent<Props> {

    const
        glyphs: GlyphMap =
            config.glyphs.reduce((obj, glyph) => {
                obj[glyph.css] = String.fromCodePoint(glyph.code)
                return obj
            }, {})

    return function ({className = '', children, glyph, ...prs}: Props) {

        glyph = glyph || children

        if (typeof glyph !== 'string') {
            if (process.env.NODE_ENV !== 'production') {
                throw Error('[glyph] param or children is required to be string string')
            }

            glyph = '#! unknown'
        }


        const char = glyphs.hasOwnProperty(glyph) ? glyphs[glyph] : glyph

        return <span className={`${baseClassName} ${className}`} {...prs}>{char}</span>

    }

}

export default fabric
