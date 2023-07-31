import { Button } from '@mui/material'
import { styled } from '@mui/material'
import { indigo, common } from '@mui/material/colors'

export const ProductPageButton = styled(Button)(({ theme }) => ({
    backgroundColor: indigo[700],
    color: common.white,
    transition: 'transform 0.3s',
    '&:hover': {
        backgroundColor: indigo[900],
        transform: "scale(1.1)"
    }
}))

