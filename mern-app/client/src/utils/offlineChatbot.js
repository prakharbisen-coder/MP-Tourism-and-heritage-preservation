import {
    monasteries,
    getSects,
    getMonasteriesBySect,
    getMonasteriesByLocation,
    findMonasteryByName
} from '../data/monasteryData';

/**
 * Offline chatbot logic using keyword matching and pattern recognition
 * @param {string} message - User's message
 * @returns {string} - Bot's response
 */
export const getOfflineResponse = (message) => {
    const lowerMessage = message.toLowerCase().trim();

    // Greeting patterns
    if (/^(hi|hello|hey|namaste|greetings)/i.test(lowerMessage)) {
        return "🙏 Namaste! I'm your offline monastery guide. I can tell you about Sikkim's 15 monasteries, their locations, sects, history, and founding dates. Try asking:\n\n• \"Tell me about Rumtek Monastery\"\n• \"Which monasteries are Nyingma sect?\"\n• \"Where is Pemayangtse?\"\n• \"What's the oldest monastery?\"\n• \"List all monasteries\"";
    }

    // Help patterns
    if (/\b(help|what can you|how do|guide)\b/i.test(lowerMessage)) {
        return "I can help you with:\n\n📍 **Monastery Information** - Ask about any specific monastery\n🏛️ **Sects** - Find monasteries by Buddhist sect (Nyingma, Kagyu)\n📍 **Locations** - Find monasteries in specific areas\n📅 **History** - Learn about founding dates and historical significance\n📋 **List All** - See all 15 monasteries\n\nJust ask your question naturally!";
    }

    // List all monasteries
    if (/\b(list|show|all|every)\b.*\b(monastery|monasteries)\b/i.test(lowerMessage)) {
        const list = monasteries.map((m, i) =>
            `${i + 1}. **${m.name}** - ${m.location} (${m.sect}, founded ${m.founded})`
        ).join('\n');
        return `Here are all 15 monasteries in Sikkim:\n\n${list}`;
    }

    // Sect-based queries
    const sectMatch = lowerMessage.match(/\b(nyingma|kagyu)\b/i);
    if (sectMatch || /\bsect\b/i.test(lowerMessage)) {
        if (sectMatch) {
            const sect = sectMatch[1];
            const filtered = getMonasteriesBySect(sect);
            if (filtered.length > 0) {
                const list = filtered.map(m => `• **${m.name}** - ${m.location} (founded ${m.founded})`).join('\n');
                return `**${sect.charAt(0).toUpperCase() + sect.slice(1)} Sect Monasteries** (${filtered.length} total):\n\n${list}`;
            }
        }
        // General sect info
        const sects = getSects();
        return `Sikkim's monasteries belong to these Buddhist sects:\n\n${sects.map(s => {
            const count = getMonasteriesBySect(s).length;
            return `• **${s}**: ${count} monasteries`;
        }).join('\n')}\n\nAsk about a specific sect to see the list!`;
    }

    // Location-based queries
    const locationKeywords = ['gangtok', 'pelling', 'yuksom', 'north sikkim', 'south sikkim', 'east sikkim', 'west sikkim', 'lachung', 'lachen', 'kalimpong', 'ranka'];
    const locationMatch = locationKeywords.find(loc => lowerMessage.includes(loc));

    if (locationMatch || /\b(where|location|place|area)\b/i.test(lowerMessage)) {
        if (locationMatch) {
            const filtered = getMonasteriesByLocation(locationMatch);
            if (filtered.length > 0) {
                const list = filtered.map(m => `• **${m.name}** - ${m.location} (${m.sect} sect, founded ${m.founded})`).join('\n');
                return `**Monasteries in ${locationMatch.charAt(0).toUpperCase() + locationMatch.slice(1)}:**\n\n${list}`;
            }
        }
    }

    // Oldest/newest monastery queries
    if (/\b(oldest|first|earliest)\b/i.test(lowerMessage)) {
        const oldest = monasteries.reduce((prev, curr) => {
            const prevYear = parseInt(prev.founded.match(/\d{4}/)?.[0] || '9999');
            const currYear = parseInt(curr.founded.match(/\d{4}/)?.[0] || '9999');
            return currYear < prevYear ? curr : prev;
        });
        return `The oldest monastery in Sikkim is **${oldest.name}**, founded in ${oldest.founded}.\n\n📜 **History**: ${oldest.history}\n📍 **Location**: ${oldest.location}\n🏛️ **Sect**: ${oldest.sect}\n\n[Learn more](${oldest.wiki})`;
    }

    if (/\b(newest|latest|recent)\b/i.test(lowerMessage)) {
        const newest = monasteries.reduce((prev, curr) => {
            const prevYear = parseInt(prev.founded.match(/\d{4}/)?.[0] || '0');
            const currYear = parseInt(curr.founded.match(/\d{4}/)?.[0] || '0');
            return currYear > prevYear ? curr : prev;
        });
        return `The newest monastery in this list is **${newest.name}**, founded in ${newest.founded}.\n\n📜 **History**: ${newest.history}\n📍 **Location**: ${newest.location}\n🏛️ **Sect**: ${newest.sect}\n\n[Learn more](${newest.wiki})`;
    }

    // Largest monastery
    if (/\b(largest|biggest|main)\b/i.test(lowerMessage)) {
        const rumtek = findMonasteryByName('Rumtek');
        if (rumtek) {
            return `The largest monastery in Sikkim is **${rumtek.name}**.\n\n📜 **History**: ${rumtek.history}\n📍 **Location**: ${rumtek.location}\n🏛️ **Sect**: ${rumtek.sect}\n📅 **Founded**: ${rumtek.founded}\n\n[Learn more](${rumtek.wiki})`;
        }
    }

    // Holiest monastery
    if (/\b(holiest|sacred|holy)\b/i.test(lowerMessage)) {
        const tashiding = findMonasteryByName('Tashiding');
        if (tashiding) {
            return `The holiest monastery in Sikkim is **${tashiding.name}**.\n\n📜 **History**: ${tashiding.history}\n📍 **Location**: ${tashiding.location}\n🏛️ **Sect**: ${tashiding.sect}\n📅 **Founded**: ${tashiding.founded}\n\n[Learn more](${tashiding.wiki})`;
        }
    }

    // Specific monastery name search
    const monasteryNames = [
        'rumtek', 'pemayangtse', 'tashiding', 'phodong', 'enchey',
        'ralong', 'lachung', 'lachen', 'dubdi', 'yuksom', 'kartok',
        'zong dog palri', 'sanga choeling', 'lingdum', 'ranka',
        'bongtang', 'phensang'
    ];

    const foundName = monasteryNames.find(name => lowerMessage.includes(name));
    if (foundName) {
        const monastery = findMonasteryByName(foundName);
        if (monastery) {
            return `**${monastery.name}**\n\n📍 **Location**: ${monastery.location}\n🏛️ **Sect**: ${monastery.sect}\n📅 **Founded**: ${monastery.founded}\n📜 **History**: ${monastery.history}\n\n[Read more on Wikipedia](${monastery.wiki})`;
        }
    }

    // When/founded queries for specific monastery
    if (/\b(when|founded|built|established)\b/i.test(lowerMessage)) {
        const foundName = monasteryNames.find(name => lowerMessage.includes(name));
        if (foundName) {
            const monastery = findMonasteryByName(foundName);
            if (monastery) {
                return `**${monastery.name}** was founded in **${monastery.founded}**.\n\n📜 ${monastery.history}`;
            }
        }
        return "Please specify which monastery you'd like to know about. For example: \"When was Rumtek founded?\"";
    }

    // History queries
    if (/\b(history|story|about|tell me)\b/i.test(lowerMessage)) {
        const foundName = monasteryNames.find(name => lowerMessage.includes(name));
        if (foundName) {
            const monastery = findMonasteryByName(foundName);
            if (monastery) {
                return `**${monastery.name}**\n\n📍 **Location**: ${monastery.location}\n🏛️ **Sect**: ${monastery.sect}\n📅 **Founded**: ${monastery.founded}\n📜 **History**: ${monastery.history}\n\n[Read more on Wikipedia](${monastery.wiki})`;
            }
        }
    }

    // Count queries
    if (/\b(how many|number of|count)\b/i.test(lowerMessage)) {
        return `There are **${monasteries.length} monasteries** in this database:\n\n• **Nyingma sect**: ${getMonasteriesBySect('Nyingma').length} monasteries\n• **Kagyu sect**: ${getMonasteriesBySect('Kagyu').length} monasteries\n\nWould you like to see the complete list?`;
    }

    // Default fallback
    return `I'm not sure how to answer that in offline mode. I can help you with:\n\n• Information about specific monasteries (e.g., "Tell me about Rumtek")\n• Monasteries by sect (e.g., "Show Nyingma monasteries")\n• Monasteries by location (e.g., "Monasteries in Gangtok")\n• Historical facts (e.g., "What's the oldest monastery?")\n• List all monasteries\n\nTry asking one of these questions, or switch to **Online Mode** for AI-powered responses!`;
};
