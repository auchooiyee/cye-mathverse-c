export const PACK_VERSION = 'cyber-1.0.0';
export const SOURCE_URL = 'https://bukuteksdigital.my/wp-content/uploads/2020/06/DSKP-MATEMATIK-Tingkatan-4-DAN-Tingkatan-5-KSSM.pdf';
export const stages = [
  { title: 'Power On', short: 'Power', subtitle: 'Wake the sleeping lab', badge: 'Spark starter', color: '#6ee7e0', story: 'Pip is trapped inside a sleeping cyber-lab. Build two power signals to wake the generator.', effect: 'The generator is awake. Pip has a little more hope.' },
  { title: 'Binary Gate', short: 'Gate', subtitle: 'Build a bridge of light', badge: 'Bridge builder', color: '#85a7ff', story: 'There is a gap in the walkway. Convert signals both ways to bring the bridge online.', effect: 'A bridge of light stretches across the gap.' },
  { title: 'Cross-Base Relay', short: 'Relay', subtitle: 'Speak the machines’ language', badge: 'Signal translator', color: '#d5a0ff', story: 'These relay towers speak different number bases. Send the same value in a new language.', effect: 'The relay towers are finally talking to each other.' },
  { title: 'Logic Circuit', short: 'Circuit', subtitle: 'Balance the energy flow', badge: 'Circuit engineer', color: '#ffc982', story: 'A broken circuit needs just the right charge. Add or subtract the supplies, then assemble the output.', effect: 'Power flows through the repaired circuit.' },
  { title: 'Security Maze', short: 'Maze', subtitle: 'Choose your first lock', badge: 'Maze navigator', color: '#ff9bd0', story: 'Two security locks block the exit route. Pick either lock first. Both must be decoded to clear the maze.', effect: 'Both locks are open. The path to the vault is clear.' },
  { title: 'Master Vault', short: 'Vault', subtitle: 'Bring Pip home', badge: 'Code breaker', color: '#cffb7d', story: 'Pip is behind the final vault! Combine the backup batteries, then reserve the right power for the escape pod.', effect: 'Vault open. Pip is free — and you made it happen.' }
];

const authored = [
  ['C01', 0, 'Generator A', 'Build a binary signal carrying 5 units of power.', '5', 10, 2, 3, '2.1.1', 'foundation'],
  ['C02', 0, 'Generator B', 'This generator uses base 3. Give it 11 units of power.', '11', 10, 3, 3, '2.1.1', 'foundation'],
  ['C03', 1, 'Bridge transmitter', 'Transmit 13 units using the binary bridge controller.', '13', 10, 2, 4, '2.1.2', 'standard'],
  ['C04', 1, 'Bridge receiver', 'The bridge replies with 10110 in base 2. Set its decimal receiver.', '10110', 2, 10, 2, '2.1.2', 'standard'],
  ['C05', 2, 'Violet relay', 'Relay 23 in base 4 to a base-3 receiver without changing its value.', '23', 4, 3, 3, '2.1.2', 'standard'],
  ['C06', 2, 'Azure relay', 'Relay 34 in base 5 to a binary receiver.', '34', 5, 2, 5, '2.1.2', 'standard'],
  ['C07', 3, 'Charge combiner', 'Combine 101 and 11, both in base 2. Send the sum in base 2.', '101', 2, 2, 4, '2.1.3', 'standard', '+', '11', 2],
  ['C08', 3, 'Charge regulator', 'The circuit holds 32 in base 5 and uses 14 in base 5. Send the remaining charge in base 5.', '32', 5, 5, 2, '2.1.3', 'standard', '-', '14', 5],
  ['C09', 4, 'Rooftop lock', 'A rooftop lock expects the binary equivalent of the route code 31 in base 4.', '31', 4, 2, 4, '2.1.2', 'standard'],
  ['C10', 4, 'Tunnel lock', 'A tunnel lock receives 110 in base 3. Translate this signal into base 4.', '110', 3, 4, 2, '2.1.4', 'standard'],
  ['C11', 5, 'Vault batteries', 'Join batteries holding 27 and 15, both in base 8. Set the base-6 vault controller to their total.', '27', 8, 6, 3, '2.1.3', 'challenge', '+', '15', 8],
  ['C12', 5, 'Escape pod', 'The pod has 101101 units in base 2. Reserve 12 decimal units for landing. Encode the remaining flight power in base 5.', '101101', 2, 5, 3, '2.1.4', 'challenge', '-', '12', 10]
];
export const questions = authored.map(([id, stage, title, prompt, source, sourceBase, targetBase, width, sp, difficulty, operation, operand, operandBase]) => ({
  id, stage, title, prompt, source, sourceBase, targetBase, width, sp, difficulty, operation, operand, operandBase,
  gameId: 'M4-02', curriculumUnitId: 'KSSM-M4-2.1', sk: '2.1', version: PACK_VERSION,
  type: 'place-value-construction', provenance: 'Original CYE-MathVerse authored classroom scenario',
  sourceUrl: SOURCE_URL, reviewedAt: null, reviewerStatus: 'teacher-review-pending',
  acceptedForms: ['leading-zero-equivalent'], tolerancePolicy: 'exact-nonnegative-integer',
  misconceptionTags: ['invalid-digit', 'place-value', 'notation']
}));
