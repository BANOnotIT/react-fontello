/**
 * Created by BANO.notIT on 08.07.18.
 */

import * as React from 'react'

type Glyph = {
  css: string
  code: number
}

type Config = {
  css_prefix_text: string
  glyphs: Glyph[]
}

type GlyphMap = { [key: string]: string }

type Props = { className?: string; children?: string; glyph?: string }

export default function fabric(
  config: Config,
  baseClassName: string = config.css_prefix_text
): React.StatelessFunctionalComponent<Props> {
  const glyphs: GlyphMap = config.glyphs.reduce((obj, glyph) => {
    obj[glyph.css] = String.fromCodePoint(glyph.code)
    return obj
  }, {})

  return function(props: Props) {
    const className = props.className
    let glyph = props.glyph || props.children

    delete props.className
    delete props.children
    delete props.glyph

    if (typeof glyph !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        throw Error('[glyph] param or children is required to be string string')
      }

      glyph = '#! unknown'
    }

    const char = glyphs.hasOwnProperty(glyph) ? glyphs[glyph] : glyph

    return (
      <span className={`${baseClassName} ${className}`} {...props}>
        {char}
      </span>
    )
  }
}
