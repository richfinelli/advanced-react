import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
`;
class DeleteItem extends Component {
    render() {
        const confirmText = "Are you sure you want to delete?";
        return (
            <Mutation
                mutation={DELETE_ITEM_MUTATION}
                variables={{id: this.props.id}}
            >
                {(deleteItem, { error }) => (
                    <button onClick={e => {
                        if (confirm(confirmText)) {
                            deleteItem();
                        }
                    }}>{this.props.children}</button>
                )}
            </Mutation>
        );
    }
}

export default DeleteItem;