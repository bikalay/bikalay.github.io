import React from "react"
import { translate } from "../../utils/i18n"

export const T = ({children, lang ='en', tk}) => {
  return <>
    {translate(lang, tk) || children}
  </>
}
