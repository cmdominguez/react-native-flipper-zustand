import {addPlugin} from 'react-native-flipper';
let connectionFlipper = null;

export default function zustandFlipper(fn, storeName) {
    addPlugin({
        getId: () => 'ZustandStore',
        runInBackground: () => true,
        onConnect(connection) {
            connectionFlipper = connection;
        },
        onDisconnect() {},
    });
    return function (set, get, api) {
        const namedSet = (state, replace, name) => {
            set(state, replace, name);
            if (connectionFlipper) {
                connectionFlipper.send('newData', {
                    storeName,
                    timestamp: new Date(),
                    title: name || 'ZustandAction',
                    state: get(),
                });
            }
        };

        return fn(namedSet, get, api);
    };
}
