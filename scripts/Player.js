const Player = (sign) => {
    let _sign = sign;
    
    const getSign = () => {
        return _sign;
    };

    const setSign = (sign) => {
        _sign = sign;
    };

    return {
        getSign,
        setSign
    };
};

export default Player;