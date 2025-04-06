export const getAchievements = (t: (key: string) => string) => {
    const achievements = [];

    for (let i=0; i<11; i++) {
        const title = t(`Events.${i}.Title`);
        const team = t(`Events.${i}.Team`);
        const image = t(`Events.${i}.Image`);

        const individual: string[] = [];
        for (let j = 0; j < 4; j++) {
            const indiv = t(`Events.${i}.Individual.${j}`)
            if (indiv) individual.push(indiv)
        }

        achievements.push({ title, team, image, individual });
    }

    return {
        heading: t("Heading"),
        description: t("Description"),
        achievements
    }
}

export const getMembers = (t: (key: string) => string) => {
    const members = [];

    for (let i=0; i<21; i++) {
        const name = t(`${i}.name`);
        const role = t(`${i}.role`);
        const url = t(`${i}.url`);

        members.push({ name, role, url });
    }

    return members;
}