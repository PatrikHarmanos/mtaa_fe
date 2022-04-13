import { useState } from 'react'

const useGlobalState = () => {
    const [state, setState] = useState(
        {
            first_name: '',
            last_name: '',
            email: '',
            id: undefined,
            is_admin: false,
            cart: [],
            finalPrice: 0
        }
    );

    const actions = (actions) => {
        const { type, payload } = actions;
        switch (type) {
            case 'setState':
                return setState(payload);
            default:
                return state;
        }
    }

    return { state, actions }
}

export default useGlobalState;