import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';
import Player from './Player';
//create the graphQL query (on the front end)
const ALL_PLAYERS_QUERY = gql`
    query ALL_PLAYERS_QUERY {
        players {
            id
            name
            team
            bio
            age
        }
    }
`;
//create some styled components
const Center = styled.div`
    text-align: center;
`;
const PlayersList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    
`;
//create the "Players" component
class Players extends Component {
    render() {
        return (
            <Center>
                <p>Players</p>
                <Query query={ALL_PLAYERS_QUERY}>
                    {({data, loading, error}) => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error: {error.message}</p>
                        return <PlayersList>
                            {data.players.map(player => {
                                return <Player key={player.id} player={player}/>
                                }
                            )}
                        </PlayersList>
                    }}
                </Query>
            </Center>
        );
    }
}

export default Players;