//Converted all three HTML pages to Pug and also used extends keyword to separate the repeating piece of code.

//Only the updated files areas below :-

// views/add-products.pug =>

extends layouts/main-layout.pug
block styles
    link(rel="stylesheet", href="/css/forms.css")
    link(rel="stylesheet", href="/css/product.css")

block content
    main
        form.product-form(action="/admin/add-product", method="POST")
            .form-control
                label(for="title") Title
                input(type="text", name="title")#title
            button.btn(type="submit") Add Product

/////////////////////////////////////////////////////////////////////////////////////////////////

// views/main-layout.pug =>
<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        title #{pageTitle}
        link(rel="stylesheet", href="/css/main.css")
        block styles
    body   
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a(href="/", class=(path === '/' ? 'active' : '')) Shop
                    li.main-header__item
                        a(href="/admin/add-product", class=(path === '/admin/add-product' ? 'active' : '')) Add Product
        block content

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// views/shop.pug =>
extends layouts/main-layout.pug
block styles
    link(rel="stylesheet", href="/css/product.css")

block content
    main
        if prods.length > 0
            .grid
                each product in prods
                    article.card.product-item
                        header.card__header
                            h1.product__title #{product.title}
                        div.card__image
                            img(src="https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt="A Book")
                        div.card__content
                            h2.product__price $19.99
                            p.product__description A very interesting book about so many even more interesting things!
                        .card__actions
                            button.btn Add to Cart
        else
            h1 No Products

////////////////////////////////////////////////////////////////////////////////////////////////

// views/404.pug =>
extends layouts/main-layout.pug

block content
    h1 Page Not Found!