import React, { Component } from 'react';
import { Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import formatMoney from '../lib/formatMoney';
import Form from './styles/Form';
import Error from './ErrorMessage';
const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: {id: $id}) {
            id
            title
            description
            price
        }
    }
`;
const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $title: String
        $description: String
        $price: Int
    ) {
        updateItem(
            id: $id
            title: $title
            description: $description
            price: $price 
        )  {
            id
            title
            description
            price
        }
    }
`;

class UpdateItem extends Component {
    state = {}
    //called when any field is CHANGED (EXCEPT FOR IMAGE UPLOAD)
    handleFieldChange = e => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? Number(value) : value;
        this.setState({ [name]: val});
    };
    updateItem = async (e, updateItemMutation) => {
        e.preventDefault();
        console.log("update item called");
        console.log(this.state);
        const res = await updateItemMutation({
            variables: {
                id: this.props.id,
                ...this.state
            }
        }); 
        console.log("Updated!!")
    };
    render() {
        return (
            <Query 
                query={SINGLE_ITEM_QUERY} 
                variables={{ id: this.props.id }}>
                {({data,loading}) => {
                    if (loading) return <p>Loadings...</p>;
                    if (!data.item) return <p>No item found for {this.props.id}</p>;
                    return (
                        <Mutation 
                            mutation={UPDATE_ITEM_MUTATION}
                            variables={this.state}
                        >
                        {(updateItem, {loading, error}) => (
                            <Form onSubmit={e => this.updateItem(e, updateItem)}>
                                <h2>Sell an item</h2>
                                <Error error={error} />
                                <fieldset disabled={ loading } aria-busy={ loading }>
                            
                                    <label htmlFor="title">
                                        Title
                                        <input 
                                        type="text" 
                                        id="title" 
                                        name="title" 
                                        placeholder="i.e. Skinny jeans" 
                                        required 
                                        defaultValue={data.item.title} 
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
                                        defaultValue={data.item.price} 
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
                                        defaultValue={data.item.description} 
                                        onChange={this.handleFieldChange}
                                        />
                                    </label>
                                    <button type="submit" disabled={loading}>Sav{loading ? "ing" : "e"} changes</button>
                                </fieldset>
                            </Form>
                        )}
                    </Mutation>
                )
            }}
        </Query>
        );
    }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };