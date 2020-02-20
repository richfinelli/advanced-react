import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';

class Player extends Component {
    render() {
        const { player } = this.props;
        return (
            <ItemStyles>
                 <Title>
                    <Link href={{
                        pathname: '/player',
                        query: { id: player.id } 
                    }}>
                        <a>{player.name}</a>
                    </Link>
                </Title>
                <p>{player.team}</p>
                <p>{player.bio}</p>
                <p>{player.age}</p>
            </ItemStyles>
        );
    }
}

Player.propTypes = {
    player: PropTypes.object.isRequired
};

export default Player;