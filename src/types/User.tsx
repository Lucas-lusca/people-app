export type User = {
    gender: string;
    email: string;
    phone: string;
    cell: string;
    nat: string;

    name: {
        title: string;
        first: string;
        last: string;
    };

    picture: {
        thumbnail: string | undefined;
        large: string;
    };

    dob: {
        age: number;
    };

    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: string | number;
    };

    login: {
        username: string;
        uuid: string;
    };

    registered: {
        age: number;
    };
};