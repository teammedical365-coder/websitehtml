const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const modFiles = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/phase2a_modified_files.json'), 'utf8'));

const filesToStage = modFiles.map(m => m.file);

const phase2aArtifacts = [
    'scratch/phase2a_environment.json',
    'scratch/phase2a_candidate_inventory.json',
    'scratch/phase2a_before_snapshot.json',
    'scratch/phase2a_modified_files.json',
    'scratch/phase2a_diff_audit.json',
    'scratch/phase2a_diff_audit.md',
    'scratch/phase2a_rollback_manifest.json',
    'scratch/phase2a_schema_sanitization_report.md',
    'scratch/phase2a_scope_reconciliation.json',
    'scratch/phase2a_removal_statistics.json',
    'scratch/phase2a_removal_forensics.json',
    'scratch/phase2a_review_required_forensics.md',
    'scratch/phase2a_representative_diff_review.md',
    'scratch/phase2a_forensic_review.md',
    'scratch/generate_phase2a_forensics.js',
    'scratch/inspect_review_required.js',
    'scratch/phase2a_discovery.js',
    'scratch/phase2a_execute_batch.js',
    'scratch/populate_phase2a_records.js',
    'scratch/test_batch_modification.js',
    'scratch/stage_phase2a.js'
];

const allToStage = filesToStage.concat(phase2aArtifacts);

const listFilePath = path.join(repoRoot, 'scratch/stage_list.txt');
fs.writeFileSync(listFilePath, allToStage.join('\n'), 'utf8');

console.log(`Staging ${allToStage.length} files via pathspec-from-file...`);
execSync('git add --pathspec-from-file=scratch/stage_list.txt', { cwd: repoRoot });

console.log('Staging completed successfully!');
