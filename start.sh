#!/bin/bash

# Function to clone the repository
clone_repository() {
    echo "Cloning the repository..."
    git clone https://github.com/istvzsig/homework-react.git
    cd homework-react || exit
}

# Function to install dependencies
install_dependencies() {
    echo "Installing dependencies..."
    npm install
    npm fund
}

# Function to run the development server
run_development_server() {
    echo "Starting the development server..."
    npm run dev
}

# Function to run tests
run_tests() {
    echo "Running tests..."
    npx jest *
}

# Function to enable or disable a component in index.tsx
toggle_component() {
    echo "Which component would you like to toggle?"
    echo "1. ProductsOrganizer"
    echo "2. UsersOrganizer"
    read -p "Enter your choice [1-2]: " component_choice

    case $component_choice in
    1)
        if grep -q "UsersOrganizer" src/pages/index.tsx; then
            echo "Switching to ProductsOrganizer in index.tsx..."
            sed -i.bak 's/import UsersOrganizer from "@\/components\/users\/UsersOrganizer"/import ProductsOrganizer from "@\/components\/products\/ProductsOrganizer"/g; s/UsersOrganizer/ProductsOrganizer/g; s/<UsersOrganizer/<ProductsOrganizer/g' src/pages/index.tsx
            echo "UsersOrganizer has been replaced with ProductsOrganizer. A backup of index.tsx is saved as index.tsx.bak."
        else
            echo "ProductsOrganizer is already in use. No changes made."
        fi
        ;;
    2)
        if grep -q "ProductsOrganizer" src/pages/index.tsx; then
            echo "Switching to UsersOrganizer in index.tsx..."
            sed -i.bak 's/import ProductsOrganizer from "@\/components\/products\/ProductsOrganizer"/import UsersOrganizer from "@\/components\/users\/UsersOrganizer"/g; s/ProductsOrganizer/UsersOrganizer/g; s/<ProductsOrganizer/<UsersOrganizer/g' src/pages/index.tsx
            echo "ProductsOrganizer has been replaced with UsersOrganizer. A backup of index.tsx is saved as index.tsx.bak."
        else
            echo "UsersOrganizer is already in use. No changes made."
        fi
        ;;
    *)
        echo "Invalid choice. No component was toggled."
        ;;
    esac
}

build_app() {
    echo "Starting building app for productions"
    npm run build
}

# Main menu function
main_menu() {
    echo "Welcome to the Homework React Setup Script"
    echo "Please choose an option:"
    echo "1. Clone the repository"
    echo "2. Install dependencies"
    echo "3. Run the development server"
    echo "4. Run tests"
    echo "5. Toggle a component in index.tsx"
    echo "6. Build app for production"
    echo "7. Exit"

    read -p "Enter your choice [1-7]: " choice

    case $choice in
    1) clone_repository ;;
    2) install_dependencies ;;
    3) run_development_server ;;
    4) run_tests ;;
    5) toggle_component ;;
    6) build_app ;;
    7)
        echo "Exiting..."
        exit 0
        ;;
    *) echo "Invalid choice. Please try again." ;;
    esac

    # Show the menu again after executing the choice
    main_menu
}

# Start the script
main_menu
