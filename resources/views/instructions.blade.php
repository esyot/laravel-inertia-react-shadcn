<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Project Setup Guide</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
</head>

<body class="bg-white text-gray-800 antialiased">

    <div class="max-w-4xl mx-auto py-12 px-6">
        <header class="mb-12 border-b pb-6">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-2">🚀 Project Setup Guide</h1>
            <p class="text-lg text-gray-600">A streamlined guide to set up and collaborate on the project efficiently.
            </p>
        </header>

        <section class="mb-10">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Quickstart</h2>
            <p class="text-gray-700 mb-4">Clone the repository and install the dependencies:</p>
            <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto"><code>
git clone --branch staging https://github.com/esyot/laravel-inertia-react-shadcn.git
cd laravel-inertia-react-shadcn
npm install
composer install
            </code></pre>
        </section>

        <section class="mb-10">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
            <p class="text-gray-700 mb-4">Start the development servers:</p>
            <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto"><code>
npm run dev
php artisan serve
            </code></pre>
        </section>

        <section class="mb-10">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Git Flow</h2>
            <ol class="list-decimal pl-6 text-gray-700 space-y-4">
                <li>
                    From the <code class="bg-gray-200 px-1 py-0.5 rounded text-sm">main</code> branch, create a <code
                        class="bg-gray-200 px-1 py-0.5 rounded text-sm">staging</code> branch:
                    <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto mt-2"><code>
git checkout -b staging
                    </code></pre>
                </li>
                <li>
                    Pull the latest changes from <code class="bg-gray-200 px-1 py-0.5 rounded text-sm">staging</code>:
                    <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto mt-2"><code>
git pull origin staging
                    </code></pre>
                </li>
            </ol>
        </section>

        <section class="mb-10">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Working on a Feature</h3>
            <ol class="list-decimal pl-6 text-gray-700 space-y-4">
                <li>
                    Create a branch from <code class="bg-gray-200 px-1 py-0.5 rounded text-sm">staging</code>:
                    <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto mt-2"><code>
git checkout -b &lt;username&gt;/feature/login
                    </code></pre>
                </li>
            </ol>
        </section>

        <section class="mb-10">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Working on a Bug Fix</h3>
            <ol class="list-decimal pl-6 text-gray-700 space-y-4">
                <li>
                    Create a branch from <code class="bg-gray-200 px-1 py-0.5 rounded text-sm">staging</code>:
                    <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto mt-2"><code>
git checkout -b &lt;username&gt;/fix/login
                    </code></pre>
                </li>
            </ol>
        </section>

        <section class="mb-10">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Committing Changes</h3>
            <ol class="list-decimal pl-6 text-gray-700 space-y-4">
                <li>Make code changes.</li>

                <li>Add changes:
                    <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto mt-2"><code>
    git add .
          </code></pre>
                </li>

                <li>Commit using <strong>Conventional Commit</strong> format:
                    <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto mt-2"><code>
    git commit -m "type(scope): short description"
          </code></pre>

                    <p class="text-sm text-gray-600 mt-2">
                        Use the format <code
                            class="bg-gray-200 px-1 py-0.5 rounded text-sm">type(scope): description</code>.
                        The <strong>scope</strong> is optional but recommended. It indicates what part of the app the
                        change
                        affects (e.g., a page, feature, or component).
                    </p>

                    <p class="text-sm text-gray-700 font-medium mt-3">Examples:</p>
                    <ul class="list-disc pl-6 text-sm text-gray-700 space-y-1">
                        <li><code class="bg-gray-200 px-1 py-0.5 rounded text-sm">feat(login): add login form</code>
                        </li>
                        <li><code
                                class="bg-gray-200 px-1 py-0.5 rounded text-sm">fix(profile): handle avatar upload bug</code>
                        </li>
                        <li><code
                                class="bg-gray-200 px-1 py-0.5 rounded text-sm">docs(readme): update contribution guidelines</code>
                        </li>
                    </ul>

                    <p class="text-sm text-gray-700 mt-4 font-medium">Allowed commit types:</p>
                    <ul class="list-disc pl-6 text-sm text-gray-700 space-y-1">
                        <li><code class="bg-gray-200 px-1 py-0.5 rounded text-sm">feat</code>: A new feature</li>
                        <li><code class="bg-gray-200 px-1 py-0.5 rounded text-sm">fix</code>: A bug fix</li>
                        <li><code class="bg-gray-200 px-1 py-0.5 rounded text-sm">docs</code>: Documentation only
                            changes</li>
                        <li><code class="bg-gray-200 px-1 py-0.5 rounded text-sm">style</code>: Formatting only (no code
                            changes)</li>
                        <li><code class="bg-gray-200 px-1 py-0.5 rounded text-sm">refactor</code>: Code changes that
                            neither fix
                            a bug nor add a feature</li>
                        <li><code class="bg-gray-200 px-1 py-0.5 rounded text-sm">perf</code>: Performance improvements
                        </li>
                        <li><code class="bg-gray-200 px-1 py-0.5 rounded text-sm">test</code>: Adding or updating tests
                        </li>
                        <li><code class="bg-gray-200 px-1 py-0.5 rounded text-sm">build</code>: Build system or
                            dependency
                            changes</li>
                        <li><code class="bg-gray-200 px-1 py-0.5 rounded text-sm">ci</code>: CI/CD configuration changes
                        </li>
                        <li><code class="bg-gray-200 px-1 py-0.5 rounded text-sm">chore</code>: Other changes that don’t
                            affect
                            source or tests</li>
                        <li><code class="bg-gray-200 px-1 py-0.5 rounded text-sm">revert</code>: Reverting a previous
                            commit
                        </li>
                    </ul>

                    <p class="text-sm text-red-600 mt-4">
                        ⚠️ Husky will block commits that don’t follow this format.
                    </p>
                </li>

                <li>Push:
                    <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto mt-2"><code>
    git push origin head
          </code></pre>
                </li>

                <li>Create a pull request to <code class="bg-gray-200 px-1 py-0.5 rounded text-sm">staging</code> and
                    request
                    review.</li>
            </ol>
        </section>


        <section class="mb-10">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Creating Pull Requests and Adding Reviewers</h2>
            <p class="text-gray-700 mb-4">When creating a pull request (PR), follow these steps to ensure proper review:
            </p>

            <h4 class="text-lg font-semibold text-gray-800">1. Add Reviewer</h4>
            <p class="text-gray-700 mb-4">Make sure to add me as a reviewer in the PR. Here’s a screenshot showing how
                to add a reviewer:</p>
            <img src="{{asset('assets/images/reviewer.png')}}" alt="How to add a reviewer"
                class="max-w-full rounded-lg mb-4" />

            <h4 class="text-lg font-semibold text-gray-800">2. Add Screenshot of the Page</h4>
            <p class="text-gray-700 mb-4">After working on the feature or fix, include a screenshot of the updated page
                or the changes you made to provide better clarity. Here’s an example:</p>
            <img src="{{asset('assets/images/comment.png')}}" alt="Example screenshot of worked page"
                class="max-w-full rounded-lg mb-4" />

            <p class="text-gray-700 mb-4">These images help reviewers understand the changes you've made and can speed
                up the review process. Simply include the images in the PR description.</p>
        </section>

        <section class="mb-10">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Merging to Local Branch</h3>
            <ol class="list-decimal pl-6 text-gray-700 space-y-4">
                <li>Switch to <code class="bg-gray-200 px-1 py-0.5 rounded text-sm">staging</code>:
                    <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto mt-2"><code>
git checkout staging
                    </code></pre>
                </li>
                <li>Pull latest changes:
                    <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto mt-2"><code>
git pull origin staging
                    </code></pre>
                </li>
                <li>Create a feature or fix branch.</li>
                <li>Repeat commit/push steps.</li>
            </ol>
        </section>
    </div>

</body>

</html>