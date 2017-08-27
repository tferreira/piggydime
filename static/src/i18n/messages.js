export default {
  en: {
    buttons: {
      submit: 'Submit',
      cancel: 'Cancel',
      add: 'Add',
      delete: 'Delete'
    },
    stepper: {
      next: 'Next',
      back: 'Back',
      finish: 'Finish',
      clickHere: 'Click here',
      backToBeginning: 'to go back to the beginning.'
    },
    home: {
      steps: {
        one: {
          title: 'Login or register',
          description: 'Use the left menu to log in or register an account.'
        },
        two: {
          title: 'Create an account',
          description:
            'Once logged in, you will be able to create your first bank account using the "plus sign" round button.'
        },
        three: {
          title: 'Recurring transactions',
          description:
            'There is a feature to schedule monthly or yearly transctions. Then edit your account projected date parameter to know your future account balance.'
        }
      },
      welcome: 'Hello, welcome on Piggydime.',
      welcomeBack: 'Welcome back, {userName}!'
    },
    header: {
      leftnav: {
        login: 'Login',
        register: 'Register',
        accounts: 'Accounts',
        recurrence: 'Recurring transactions',
        logout: 'Logout'
      },
      home: 'Home',
      title: 'Piggydime'
    },
    login: {
      title: 'Login to access your accounts',
      success: 'You have been successfully logged in.',
      error: 'Authentication Error: {statusText}',
      email_error_text: 'Sorry, this is not a valid email',
      password_error_text: 'Your password must be at least 6 characters',
      email_label: 'Email',
      password_label: 'Password'
    },
    logout: {
      success: 'You have been successfully logged out.'
    },
    register: {
      title: 'Register to create your private space',
      success: 'You have been successfully logged in.',
      error: 'Register Error: {statusText}',
      email_error_text: 'Sorry, this is not a valid email',
      password_error_text: 'Your password must be at least 6 characters',
      email_label: 'Email',
      password_label: 'Password'
    },
    accounts: {
      sidelist: {
        subheader: 'Your accounts'
      }
    },
    transactionsList: {
      noAccount: "Create an account if you don't have one yet",
      snack: {
        create: 'Transaction added',
        edit: 'Transaction updated',
        delete: 'Transaction deleted'
      },
      table: {
        tick: 'Tick',
        date: 'Date',
        label: 'Label',
        debit: 'Debit',
        credit: 'Credit'
      }
    },
    addTransaction: {
      buttons: {
        add: 'Add transaction'
      },
      modal: {
        title: 'Add transaction',
        label_error_text: 'Label is mandatory',
        amount_error_text: {
          empty: 'Amount is mandatory',
          invalid: 'Amount should be a number'
        },
        date: 'Date',
        date_hint: 'Transaction date',
        label: 'Description',
        label_hint: 'Enter a description',
        amount: 'Amount',
        amount_hint: 'Use -00.00 for debit transactions'
      }
    },
    editTransaction: {
      modal: {
        title: 'Edit transaction'
      }
    },
    recurrenceContainer: {
      selectLabel: 'Selected account',
      snack: {
        create: 'Recurring transction added',
        edit: 'Recurring transction updated',
        delete: 'Recurring transction deleted'
      }
    },
    tiles: {
      currentBalance:
        '{bankLabel} - {bankName} has a current balance of <mark>{accountBalance}</mark>',
      projectedBalance:
        'Projected balance at {projectedDate}: <mark>{projectedBalance}</mark>'
    }
  },
  fr: {
    buttons: {
      submit: 'Envoyer',
      cancel: 'Annuler',
      add: 'Ajouter',
      delete: 'Supprimer'
    },
    stepper: {
      next: 'Suivant',
      back: 'Précédent',
      finish: 'Terminer',
      clickHere: 'Cliquez ici',
      backToBeginning: 'pour revenir au début.'
    },
    home: {
      steps: {
        one: {
          title: 'Identifiez-vous',
          description: 'Dépliez le menu de gauche pour vous identifier.'
        },
        two: {
          title: 'Créez un compte bancaire',
          description:
            'Une fois identifié, créez votre premier compte bancaire en utilisant le bouton "plus".'
        },
        three: {
          title: 'Transactions récurrentes',
          description:
            'Planifiez des transactions mensuelles ou annuelles. Editez les options de votre compte et définissez la date de solde prévisionnel.'
        }
      },
      welcome: 'Bienvenue sur Piggydime !',
      welcomeBack: 'Bonjour, {userName} !'
    },
    header: {
      leftnav: {
        login: 'Se connecter',
        register: 'Créer un compte',
        accounts: 'Mes comptes',
        recurrence: 'Transactions récurrentes',
        logout: 'Se déconnecter'
      },
      home: 'Accueil',
      title: 'Piggydime'
    },
    login: {
      title: 'Identifiez-vous pour accéder à votre espace privé',
      success: 'Connection réussie !',
      error: 'Erreur : {statusText}',
      email_error_text: 'Adresse e-mail invalide',
      password_error_text:
        'Votre mot de passe doit comprendre au minimum 6 caractères',
      email_label: 'E-mail',
      password_label: 'Mot de passe'
    },
    logout: {
      success: 'Vous avez bien été déconnecté.'
    },
    register: {
      title: 'Enregistrez-vous pour accéder à votre espace privé',
      success: 'Connection réussie !',
      error: 'Erreur : {statusText}',
      email_error_text: 'Adresse e-mail invalide',
      password_error_text:
        'Votre mot de passe doit comprendre au minimum 6 caractères',
      email_label: 'E-mail',
      password_label: 'Mot de passe'
    },
    accounts: {
      sidelist: {
        subheader: 'Mes comptes'
      }
    },
    transactionsList: {
      noAccount: "Ajoutez votre premier compte bancaire si ce n'est déja fait.",
      snack: {
        create: 'Transaction ajoutée',
        edit: 'Transaction mise à jour',
        delete: 'Transaction supprimée'
      },
      table: {
        tick: 'Pointer',
        date: 'Date',
        label: "Nature de l'opération",
        debit: 'Débit',
        credit: 'Crédit'
      }
    },
    addTransaction: {
      buttons: {
        add: 'Créer une transaction'
      },
      modal: {
        title: 'Ajouter une transaction',
        label_error_text: "Nature de l'opération requise",
        amount_error_text: {
          empty: 'Montant requis',
          invalid: 'Montant invalide'
        },
        date: 'Date',
        date_hint: 'Date de transaction',
        label: "Nature de l'opération",
        label_hint: 'Entrez une description',
        amount: 'Montant',
        amount_hint: 'Utilisez -00.00 pour les débits'
      }
    },
    editTransaction: {
      modal: {
        title: 'Editer la transaction'
      }
    },
    recurrenceContainer: {
      selectLabel: 'Choisissez un compte',
      snack: {
        create: 'Transaction récurrente ajoutée',
        edit: 'Transaction récurrente mise à jour',
        delete: 'Transaction récurrente supprimée'
      }
    },
    tiles: {
      currentBalance:
        '{bankLabel} - {bankName} présente un solde de <mark>{accountBalance}</mark>',
      projectedBalance:
        'Solde prévisionnel au {projectedDate}: <mark>{projectedBalance}</mark>'
    }
  }
}
