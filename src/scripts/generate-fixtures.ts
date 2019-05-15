import {createConnection, createQueryBuilder, getManager} from 'typeorm';
import {Rainbow, User, Word} from '../app/entities';
import {RAINBOWS, USERS} from '../data';

export const schema = {
    additionalProperties: false,
    properties: {},
    required: [],
    type: 'object',
};

export async function main() {
    await createConnection();

    // Remove data
    await createQueryBuilder()
        .delete()
        .from(Word)
        .execute()
        .then(() => {
            console.log('Data from Word successfully removed');
        });

    await createQueryBuilder()
        .delete()
        .from(Rainbow)
        .execute()
        .then(() => {
            console.log('Data from Rainbow successfully removed');
        });

    await createQueryBuilder()
        .delete()
        .from(User)
        .execute()
        .then(() => {
            console.log('Data from User successfully removed');
        });

    // Insert users fixtures
    for (const user of USERS) {
        const userToInsert = new User();
        userToInsert.email = user.email;
        userToInsert.setPassword(user.email);
        await getManager().save(userToInsert);
    }
    console.log(`${USERS.length} users successfully added`);

    // Insert rainbows and words fixtures
    let nbWords = 0;
    for (const rainbow of RAINBOWS) {
        const rainbowToInsert = new Rainbow();
        rainbowToInsert.label = rainbow.label;
        await getManager().save(rainbowToInsert).then(rainbowSaved => {
            for (const word of rainbow.words) {
                const wordToInsert = new Word();
                wordToInsert.label = word.label;
                wordToInsert.translation = word.translation;
                wordToInsert.rainbow = rainbowSaved;
                getManager().save(wordToInsert);
            }
            nbWords += rainbow.words.length;
        });
    }
    console.log(`${RAINBOWS.length} rainbows successfully added`);
    console.log(`${nbWords} words successfully added`);
}
