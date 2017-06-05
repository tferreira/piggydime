"""empty message

Revision ID: 5b42ffd710c5
Revises: 25496a342ff5
Create Date: 2017-06-05 17:22:01.512779

"""

# revision identifiers, used by Alembic.
revision = '5b42ffd710c5'
down_revision = '25496a342ff5'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('recurring_group', sa.Column('recurrence_month', sa.Integer(), nullable=True))
    op.drop_column('recurring_group', 'recurrence_period')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('recurring_group', sa.Column('recurrence_period', mysql.VARCHAR(length=10), nullable=True))
    op.drop_column('recurring_group', 'recurrence_month')
    ### end Alembic commands ###
