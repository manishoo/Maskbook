import { memo } from 'react'
import { Box, Link, Typography } from '@material-ui/core'

export interface PersonaLineProps {
    provider: {
        internalName: string
        connected: boolean
        userId?: string
    }
}

export const PersonaLine = memo<PersonaLineProps>(({ provider: { userId, internalName, connected } }) => {
    return (
        <Box display="flex" justifyContent="space-between">
            <Typography variant="caption">{userId ?? `Connect to ${internalName}`}</Typography>
            {connected && (
                <Link component="button" variant="caption">
                    Disconnect
                </Link>
            )}
        </Box>
    )
})
