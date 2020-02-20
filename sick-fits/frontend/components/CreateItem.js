import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import formatMoney from '../lib/formatMoney';
import Form from './styles/Form';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $image: String
        $largeImage: String
        $price: Int!
    ) {
        createItem(
            title: $title
            description: $description
            image: $image
            largeImage: $largeImage
            price: $price 
        )  {
            id
        }
    }
`;

class CreateItem extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 0
    }
    //called when any field is CHANGED (EXCEPT FOR IMAGE UPLOAD)
    handleFieldChange = e => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? Number(value) : value;
        this.setState({ [name]: val});
    }
    //CALLED WHEN AN IMAGE IS SELECTED
    uploadFile = async e => {
        const files = e.target.files;
        const data = new FormData();
        console.log(files, data);
        data.append("file", files[0]);
        data.append("upload_preset", "planning-poker");
        console.log(files, data);

        const res = await fetch('https://api.cloudinary.com/v1_1/planningpoker/image/upload', {
            method: "POST",
            body: data
        });
        const file = await res.json();
        console.log(file);
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        })
        console.log(this.state);

    };
    render() {
        return (
            <Mutation 
                mutation={CREATE_ITEM_MUTATION}
                variables={this.state}
            >
            {(createItem, {loading, error}) => (
                <Form onSubmit={async e => {
                    //stop form from submitting
                    e.preventDefault();
                    //call the mutation - update the database with teh new item
                    const res = await createItem(); //THIS UPDATES THE DATA BASE!!!
                    //route to the single item page
                    console.log(res);
                    Router.push({
                        pathname: '/Item',
                        query: { id: res.data.createItem.id }
                    });
    
                }}>
                    <h2>Sell an item</h2>
                    <Error error={error} />
                    <fieldset disabled={ loading } aria-busy={ loading }>
                    <label htmlFor="file">
                        Image
                        <input 
                        type="file" 
                        id="file" 
                        name="file" 
                        placeholder="Add your file..." 
                        required 
                        onChange={this.uploadFile}
                        />
                    </label>
                    {this.state.image && <img width="150" src={this.state.image} alt="Image preview" />} 
                       <label htmlFor="title">
                            Title
                            <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            placeholder="i.e. Skinny jeans" 
                            required 
                            value={this.state.title} 
                            onChange={this.handleFieldChange}
                            />
                        </label>
                        <label htmlFor="price">
                            Price
                            <input 
                            type="number" 
                            id="price" 
                            name="price" 
                            placeholder="i.e. 479" 
                            required 
                            value={this.state.price} 
                            onChange={this.handleFieldChange}
                            />
                        </label>
                        <label htmlFor="description">
                            Description
                            <textarea 
                            type="number" 
                            id="description" 
                            name="description" 
                            placeholder="i.e. This is an awesome product..." 
                            required 
                            value={this.state.description} 
                            onChange={this.handleFieldChange}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </fieldset>
                </Form>
            )}
            </Mutation>
        );
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };