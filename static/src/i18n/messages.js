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
    addAccount: {
      modal: {
        title: 'Add account',
        iban_error_text: 'Your IBAN can have 34 characters max',
        bic_error_text: 'Your BIC can have 12 characters max.',
        label: 'Account name',
        bank: 'Bank',
        IBAN: 'IBAN',
        BIC: 'BIC',
        projected_date: 'Projected balance date'
      }
    },
    editAccount: {
      modal: {
        title: 'Edit account',
        confirm_delete: 'Do you really want to delete this account?'
      }
    },
    addRecurrence: {
      modal: {
        title: 'Create recurring transaction',
        label_error_text: 'Label is mandatory',
        amount_error_text: {
          empty: 'Amount is mandatory',
          invalid: 'Amount should be a number'
        },
        recurrence_day_error_text: {
          empty: 'Day of month is mandatory',
          invalid: 'Day of month should be between 1 and 31.'
        },
        recurrence_month_error_text:
          'Month of year should be between 1 and 12.',
        from: 'From',
        until: 'Until',
        day_of_month: 'Day of month',
        month_of_year: 'Month of year',
        day_of_month_hint: 'Between 1 and 31',
        month_of_year_hint: 'Leave empty if monthly',
        label: 'Description',
        label_hint: 'Enter a description',
        amount: 'Amount',
        amount_hint: 'Use -00.00 for debit transactions'
      }
    },
    recurrenceContainer: {
      title: 'Recurring transactions',
      selectLabel: 'Selected account',
      snack: {
        create: 'Recurring transction added',
        edit: 'Recurring transction updated',
        delete: 'Recurring transction deleted'
      }
    },
    recurrenceList: {
      confirm_delete:
        'Do you really want to delete the recurring group: {label}?',
      table: {
        label: 'Label',
        from: 'From',
        until: 'Until',
        amount: 'Amount',
        day_of_month: 'Day of month',
        month_of_year: 'Month of year',
        actions: 'Actions',
        archived: ' (FINISHED)'
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
    addAccount: {
      modal: {
        title: 'Ajouter un compte',
        iban_error_text: 'IBAN limité à 34 caractères',
        bic_error_text: 'BIC limité à 12 caractères',
        label: 'Nom du compte',
        bank: 'Banque',
        IBAN: 'IBAN',
        BIC: 'BIC',
        projected_date: 'Date de solde prévisionnel'
      }
    },
    editAccount: {
      modal: {
        title: 'Editer un compte',
        confirm_delete: 'Voulez-vous vraiment supprimer ce compte ?'
      }
    },
    addRecurrence: {
      modal: {
        title: 'Ajouter une transaction récurrente',
        label_error_text: "Nature de l'opération requise",
        amount_error_text: {
          empty: 'Montant requis',
          invalid: 'Montant invalide'
        },
        recurrence_day_error_text: {
          empty: 'Jour du mois requis',
          invalid: 'Le jour du mois dois être compris entre 1 et 31'
        },
        recurrence_month_error_text:
          "Le mois de l'année doit être compris entre 1 and 12.",
        from: 'Date de début',
        until: 'Date de fin',
        day_of_month: 'Jour du mois',
        month_of_year: "Mois de l'année",
        day_of_month_hint: 'Entre 1 et 31',
        month_of_year_hint: 'Laisser vide si mensuelle',
        label: "Nature de l'opération",
        label_hint: 'Entrez une description',
        amount: 'Montant',
        amount_hint: 'Utilisez -00.00 pour les débits'
      }
    },
    recurrenceContainer: {
      title: 'Transactions récurrentes',
      selectLabel: 'Choisissez un compte',
      snack: {
        create: 'Transaction récurrente ajoutée',
        edit: 'Transaction récurrente mise à jour',
        delete: 'Transaction récurrente supprimée'
      }
    },
    recurrenceList: {
      confirm_delete:
        'Voulez-vous vraiment supprimer la transaction récurrente suivante: {label} ?',
      table: {
        label: "Nature de l'opération",
        from: 'Début',
        until: 'Fin',
        amount: 'Montant',
        day_of_month: 'Jour du mois',
        month_of_year: "Mois de l'année",
        actions: 'Actions',
        archived: ' (TERMINÉ)'
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
