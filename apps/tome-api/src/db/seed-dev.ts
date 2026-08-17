import 'dotenv/config';

import { db } from '.';
import { users } from './schema';

/**
 * Seeds two local players for development so you can log in via
 * `GET /auth/dev?userId=<id>` and play a game against each other.
 * Idempotent — safe to run multiple times.
 */
const devUsers = [
	{ id: 'you', username: 'You', githubId: 100001, avatarUrl: null },
	{ id: 'claude', username: 'Claude', githubId: 100002, avatarUrl: null },
];

for (const user of devUsers) {
	await db.insert(users).values(user).onConflictDoNothing({ target: users.id });
}

console.log(
	'Seeded dev users:',
	devUsers.map(u => u.id).join(', '),
);
process.exit(0);
