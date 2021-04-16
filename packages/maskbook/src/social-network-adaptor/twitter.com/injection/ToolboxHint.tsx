import { LiveSelector, MutationObserverWatcher } from '@dimensiondev/holoflows-kit'
import { ToolboxHint } from '../../../components/InjectedComponents/ToolboxHint'
import { createReactRootShadowed } from '../../../utils/shadow-root/renderInShadowRoot'
import { toolBoxInSideBarSelector } from '../utils/selector'
import { startWatch } from '../../../utils/watcher'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { fromRGB, getBackgroundColor } from '../../../utils/theme-tools'

export function injectToolboxHintAtTwitter(signal: AbortSignal) {
    const watcher = new MutationObserverWatcher(toolBoxInSideBarSelector())
    startWatch(watcher, signal)
    createReactRootShadowed(watcher.firstDOMProxy.afterShadow, { signal }).render(<ToolboxHintAtTwitter />)
}

type Key = '21,32,43' | '0,0,0' | '255,255,255' | 'dark' | 'light' | undefined

//color
const COLOR = {
    '21,32,43': 'rgb(255,255,255)',
    '0,0,0': 'rgb(217,217,217)',
    '255,255,255': 'rgb(15,20,25)',
    light: 'rgb(15, 20, 25)',
    dark: 'rgb(217, 217, 217)',
}
const HOVERCOLOR = {
    '21,32,43': 'rgb(23, 46, 63)',
    '0,0,0': 'rgb(7, 15, 25)',
    '255,255,255': 'rgb(233, 246, 253)',
    dark: 'rgb(7, 15, 25)',
    light: 'rgb(233, 246, 253)',
}

const ACTIVECOLOR = {
    '21,32,43': 'rgb(25, 59, 82)',
    '0,0,0': 'rgb(13, 29, 48)',
    '255,255,255': 'rgb(212,237,252)',
    dark: 'rgb(13, 29, 48)',
    light: 'rgb(212,237,252)',
}

function getColor(colorMap: any, backgroundColor: string, theme: Theme): string {
    const color = fromRGB(backgroundColor)
    if (!color) return colorMap[(theme.palette.mode as Key) ?? 'light']
    const code = color?.slice(0, 3)?.join(',')
    return colorMap[(code as Key) ?? (theme.palette.mode as Key) ?? 'light']
}

const useStyles = makeStyles((theme) =>
    createStyles<string, { backgroundColor: string }>({
        wrapper: {
            paddingTop: 4,
            paddingBottom: 4,
            cursor: 'pointer',
            [theme.breakpoints.down('lg')]: {
                transform: 'translateX(0px)',
            },
        },
        menuItem: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        title: {
            color: (props) => getColor(COLOR, props.backgroundColor, theme),
            fontSize: 18,
        },
        text: {
            marginLeft: 12,
            fontSize: 15,
            color: theme.palette.mode === 'dark' ? 'rgb(217, 217, 217)' : 'rgb(15, 20, 25)',
            paddingRight: theme.spacing(2),
        },
        icon: {
            color: (props) => getColor(COLOR, props.backgroundColor, theme),
        },
        button: {
            '&:hover': {
                backgroundColor: (props) => getColor(HOVERCOLOR, props.backgroundColor, theme),
            },
            '&:active': {
                backgroundColor: (props) => getColor(ACTIVECOLOR, props.backgroundColor, theme),
            },
        },
    }),
)

function ToolboxHintAtTwitter() {
    const ele = new LiveSelector().querySelector<HTMLDivElement>('body')
    const backgroundColor = getBackgroundColor(ele.evaluate()[0])
    const classes = useStyles({ backgroundColor })

    // Todo: add click handler
    return (
        <ToolboxHint
            classes={{
                wrapper: classes.wrapper,
                menuItem: classes.menuItem,
                title: classes.title,
                text: classes.text,
                button: classes.button,
                icon: classes.icon,
            }}
        />
    )
}
