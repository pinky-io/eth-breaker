import { LensClient, production } from "@lens-protocol/client";

export async function getOwnedProfileId(client, address) {
    const ownedProfiles = await client.profile.fetchAll({
        where: { ownedBy: [address] },
    });

    if (ownedProfiles.items.length === 0) {
        throw new Error(`You don't have any profiles, create one first`);
    }

    return [ownedProfiles.items[0].id, ownedProfiles.items[0].metadata.bio];
}

async function getWalletLensData(address) {
    const client = new LensClient({
        environment: production,
    });

    const profile = await getOwnedProfileId(client, address);

    const result = (
        await client.publication.fetchAll({
            where: {
                from: [profile[0]],
            },
        })
    ).items.sort((a, b) => {
        /*
          stats: {
        id: '0xb00a-0x01',
        comments: 0,
        mirrors: 0,
        quotes: 0,
        bookmarks: 0,
        upvoteReactions: 1,
        downvoteReactions: 0,
        countOpenActions: 0
      }
          */
        return a.stats.upvoteReactions - b.stats.upvoteReactions;
    });

    console.log("wallet: " + address);
    console.log("bio: '" + profile[1] + "'");
    console.dir(
        result.map((el) => {
            return {
                owner: el.by.ownedBy,
                content: el.metadata ?.content,
            };
        }),
        { depth: 2 }
    );
}

getWalletLensData("0xa5D4a4ac8150001529873398DAcbd1a6e15Aba83");