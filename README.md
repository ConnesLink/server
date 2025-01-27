# Connes Backend
This repository includes the backend (API) of the Connes authentication system.

## Setup
This code runs on the [Bun](https://bun.sh) runtime. Make sure that Bun is installed in your device.

### Installing manually
1. Clone the repository to your device.
```bash
$ git clone https://github.com/ConnesLink/server.git
```

2. Install the dependencies.
```bash
$ bun install
```
3. Edit the `.env` or the `.env.example` file.

4. Run the code.
```bash
$ bun run start
```

### Installing with Docker
We currently don't have any Docker containers, but we plan on building and distributing some.

### Running with executables
You can find pre-built executables in the [releases](https://github.com/ConnesLink/server/releases/) page.
> [!WARNING]
> Make sure you download the executable built **for** your operating system.

## License
This software is licensed under the [Mozilla Public License Version 2](LICENSE).
