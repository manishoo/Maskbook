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

function getColor(backgroundColor: string, theme: Theme): string {
    const color = fromRGB(backgroundColor)
    if (!color) {
        return theme.palette.mode === 'dark' ? 'rgb(217, 217, 217' : 'rgb(15, 20, 25)'
    }
    if (color?.[0] === 21 && color?.[1] === 32 && color?.[2] === 43) {
        return 'rgb(255, 255, 255)'
    }
    if (color?.[0] === 0 && color?.[1] === 0 && color?.[2] === 0) {
        return 'rgb(217, 217, 217)'
    }

    if (color?.[0] === 255 && color?.[1] === 255 && color?.[2] === 255) {
        return 'rgb(15, 20, 25)'
    }

    return theme.palette.mode === 'dark' ? 'rgb(217, 217, 217' : 'rgb(15, 20, 25)'
}

function getActiveColor(backgroundColor: string, theme: Theme): string {
    const color = fromRGB(backgroundColor)
    if (!color) {
        return theme.palette.mode === 'dark' ? 'rgb(13, 29, 48)' : 'rgb(212,237,252)'
    }
    if (color?.[0] === 21 && color?.[1] === 32 && color?.[2] === 43) {
        return 'rgb(23, 46, 63)'
    }
    if (color?.[0] === 0 && color?.[1] === 0 && color?.[2] === 0) {
        return 'rgb(13, 29, 48)'
    }

    if (color?.[0] === 255 && color?.[1] === 255 && color?.[2] === 255) {
        return 'rgb(212,237,252)'
    }

    return theme.palette.mode === 'dark' ? 'rgb(13, 29, 48)' : 'rgb(212,237,252)'
}

function getHoverColor(backgroundColor: string, theme: Theme): string {
    const color = fromRGB(backgroundColor)
    if (!color) {
        return theme.palette.mode === 'dark' ? 'rgb(7, 15, 25)' : 'rgb(233, 246, 253)'
    }
    if (color?.[0] === 21 && color?.[1] === 32 && color?.[2] === 43) {
        return 'rgb(23, 46, 63)'
    }
    if (color?.[0] === 0 && color?.[1] === 0 && color?.[2] === 0) {
        return 'rgb(7, 15, 25)'
    }
    if (color?.[0] === 255 && color?.[1] === 255 && color?.[2] === 255) {
        return 'rgb(233, 246, 253)'
    }
    return theme.palette.mode === 'dark' ? 'rgb(7, 15, 25)' : 'rgb(233, 246, 253)'
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
            color: (props) => getColor(props.backgroundColor, theme),
        },
        text: {
            marginLeft: 12,
            fontSize: 15,
            color: theme.palette.mode === 'dark' ? 'rgb(217, 217, 217)' : 'rgb(15, 20, 25)',
            paddingRight: theme.spacing(2),
        },
        icon: {
            color: (props) => getColor(props.backgroundColor, theme),
        },
        button: {
            '&:hover': {
                backgroundColor: (props) => getHoverColor(props.backgroundColor, theme),
            },
            '&:active': {
                backgroundColor: (props) => getActiveColor(props.backgroundColor, theme),
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
