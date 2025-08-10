'use client'

import { $generationParameters, $generationParametersVisible } from '@/features/generation-parameters'
import { generatePassword } from '@/shared/lib/password/generator'
import { Textarea } from '@/shared/ui/textarea'
import { useUnit } from 'effector-react'
import { FC, useEffect, useRef, useState } from 'react'
import { $password, setPassword } from '../model/password'

const MAX_ROWS = 7
const MAX_WIDTH_VW = 90
const ANIMATION_DELAY = 20

const measureTextWidth = (text: string, styles: CSSStyleDeclaration): number => {
    const span = document.createElement('span')
    span.style.visibility = 'hidden'
    span.style.position = 'absolute'
    span.style.whiteSpace = 'nowrap'
    span.style.fontSize = styles.fontSize
    span.style.fontWeight = styles.fontWeight
    span.style.fontFamily = styles.fontFamily
    span.textContent = text

    document.body.appendChild(span)
    const width = span.offsetWidth + 24
    document.body.removeChild(span)

    return width
}

const measureTextRows = (text: string, styles: CSSStyleDeclaration): number => {
    const div = document.createElement('div')
    div.style.visibility = 'hidden'
    div.style.position = 'absolute'
    div.style.width = `${MAX_WIDTH_VW}vw`
    div.style.fontSize = styles.fontSize
    div.style.fontWeight = styles.fontWeight
    div.style.fontFamily = styles.fontFamily
    div.style.lineHeight = styles.lineHeight
    div.style.padding = '12px'
    div.style.wordWrap = 'break-word'
    div.style.wordBreak = 'break-all'
    div.style.boxSizing = 'border-box'
    div.textContent = text

    document.body.appendChild(div)
    const height = div.offsetHeight
    const paddingTop = parseFloat(styles.paddingTop) || 0
    const paddingBottom = parseFloat(styles.paddingBottom) || 0
    const contentHeight = height - paddingTop - paddingBottom
    const lineHeight = parseFloat(styles.lineHeight) || parseFloat(styles.fontSize) * 1.2
    document.body.removeChild(div)

    return Math.max(1, Math.ceil(contentHeight / lineHeight) - 1)
}

const PasswordEntity: FC = () => {
    const password = useUnit($password)
    const generationParameters = useUnit($generationParameters)
    const generationParametersVisible = useUnit($generationParametersVisible)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [dynamicWidth, setDynamicWidth] = useState('10ch')
    const [dynamicRows, setDynamicRows] = useState(1)

    useEffect(() => {
        if (!generationParametersVisible) {
            const newPassword = generatePassword(generationParameters)

            if (isFirstLoad) {
                let currentIndex = 0
                let timeoutId: NodeJS.Timeout

                const animateTyping = () => {
                    if (currentIndex <= newPassword.length) {
                        setPassword(newPassword.slice(0, currentIndex))
                        currentIndex += 1
                        timeoutId = setTimeout(animateTyping, ANIMATION_DELAY)
                    } else {
                        setIsFirstLoad(false)
                    }
                }

                animateTyping()

                return () => clearTimeout(timeoutId)
            } else {
                setPassword(newPassword)
            }
        }
    }, [generationParametersVisible, generationParameters, isFirstLoad])

    useEffect(() => {
        if (!password || !textareaRef.current) {
            setDynamicWidth('10ch')
            setDynamicRows(1)
            return
        }

        const styles = window.getComputedStyle(textareaRef.current)
        const maxWidthPx = (window.innerWidth * MAX_WIDTH_VW) / 100

        const textWidth = measureTextWidth(password, styles)

        if (textWidth <= maxWidthPx) {
            setDynamicWidth(`${textWidth}px`)
            setDynamicRows(1)
        } else {
            setDynamicWidth(`${MAX_WIDTH_VW}vw`)
            const rows = measureTextRows(password, styles)
            setDynamicRows(Math.min(rows, MAX_ROWS))
        }
    }, [password])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(e.target.value)
    }

    const shouldWrap = dynamicWidth === `${MAX_WIDTH_VW}vw`
    const shouldScroll = dynamicRows === MAX_ROWS

    return (
        <Textarea
            ref={textareaRef}
            value={password}
            onChange={handleChange}
            rows={dynamicRows}
            spellCheck={false}
            style={{
                width: dynamicWidth,
                minWidth: '10ch',
                maxWidth: `${MAX_WIDTH_VW}vw`,
                whiteSpace: shouldWrap ? 'normal' : 'nowrap',
                wordBreak: shouldWrap ? 'break-all' : 'normal',
                overflow: shouldScroll ? 'auto' : 'hidden',
            }}
            className="hide-scrollbar flex items-center justify-center border-none text-center text-xl leading-none font-black focus-visible:ring-0 sm:text-2xl md:text-3xl"
        />
    )
}

PasswordEntity.displayName = 'PasswordEntity'

export { PasswordEntity }
