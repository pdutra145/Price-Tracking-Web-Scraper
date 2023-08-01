import React, { useMemo } from 'react'
import Navbar from '../components/Navbar'
import useProducts from '../hooks/Products'
import { useParams, Link } from 'react-router-dom'
import { Grid, styled } from '@mui/material'
import { ProductPageButton as Button } from '../components/Button'
import { indigo } from '@mui/material/colors'
import DashboardIcon from '@mui/icons-material/Dashboard';

const MainGrid = styled(Grid)({
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
})

const Header = styled('h3')({
    textAlign: 'center',
    color: indigo[700],
    fontWeight: 'bold',
    fontSize: '1.25rem',
    marginBottom: '5px'
})

const ProductInfo = styled('p')({
    margin: '1rem 0',
    fontSize: '1rem',
    textAlign: 'center'
})

const DashboardLink = styled(Link)({
    padding: 10,
    fontSize: 'medium'
})

const ProductPage = () => {
    const { products } = useProducts()
    const { id } = useParams()

    const product = useMemo(() => products.find((prod) => prod.id === parseInt(id)), [products, id])

    console.log(product)

    return (
        <Navbar header="Detalhes do Produto">
            {!product && <h1 className='text-center m-10'>Product not found</h1>}
            {product && <section id="product-details">
                <DashboardLink to='/dashboard'><DashboardIcon /> Dashboard</DashboardLink>
                <MainGrid container spacing={6} >
                    <Grid item sm={12} lg={6} id="img-div" my={5}> <img src={product.img} alt={product.name} className='rounded-md border-2' /></Grid>
                    <Grid container spacing={4} lg={6} alignItems={"center"} justifyContent={"center"} id="product-div">
                        <Grid item lg={12}>
                            <Header>Produto:</Header>
                            <ProductInfo>{product.name}</ProductInfo>
                        </Grid>
                        <Grid item lg={12}>
                            <Header>Preço:</Header>
                            <ProductInfo>{product.price}</ProductInfo>
                        </Grid>
                        <Grid item lg={12}>
                            <Header>Pesquisado em:</Header>
                            <ProductInfo>{new Date(product.created_at).toLocaleDateString()}</ProductInfo>
                        </Grid>
                    </Grid>

                    <Grid item lg={12} id="url-div">
                        <Button>
                            <a href={product.source + product.url} target='_blank' rel='noreferrer'>Ver Produto</a>
                        </Button>
                    </Grid>
                </MainGrid>

            </section>}
        </Navbar>
    )
}

export default ProductPage