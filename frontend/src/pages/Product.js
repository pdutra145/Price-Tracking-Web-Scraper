import React, { useMemo, useEffect } from 'react'
import Navbar from '../components/Navbar'
import useProducts from '../hooks/Products'
import { useParams } from 'react-router-dom'
import { Grid, styled } from '@mui/material'
import { ProductPageButton as Button } from '../components/Button'
import { indigo } from '@mui/material/colors'

const MainGrid = styled(Grid)({
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
})

const Header = styled('h3')({
    textAlign: 'center',
    color: indigo[700],
    fontWeight: 'bold',
    fontSize: '1.25em',
    marginBottom: '5px'
})

const ProductPage = () => {
    const { products, fetchProducts } = useProducts()
    const { id } = useParams()

    useEffect(() => {
        fetchProducts();
        console.log(products);
    }, []);

    const product = useMemo(() => products.find((prod) => prod.id === parseInt(id)), [products, id])

    console.log(product)

    return (
        <Navbar header="Detalhes do Produto">
            {!product && <h1 className='text-center m-10'>Product not found</h1>}
            {product && <section id="product-details">
                <MainGrid container spacing={6} >
                    <Grid item sm={12} lg={6} id="img-div" my={5}> <img src={product.img} alt={product.name} className='rounded-md border-2' /></Grid>
                    <Grid container spacing={4} lg={6} alignItems={"center"} justifyContent={"center"} id="product-div">
                        <Grid item lg={12}>
                            <Header>Produto:</Header>
                            <p>{product.name}</p>
                        </Grid>
                        <Grid item lg={12}>
                            <Header>Preço:</Header>
                            <p>{product.price}</p>
                        </Grid>
                        <Grid item lg={12}>
                            <Header>Pesquisado em:</Header>
                            <p>{new Date(product.created_at).toLocaleDateString()}</p>
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