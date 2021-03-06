"""empty message

Revision ID: 25496a342ff5
Revises: c9562c4ea006
Create Date: 2017-06-05 00:07:01.940693

"""

# revision identifiers, used by Alembic.
revision = '25496a342ff5'
down_revision = 'c9562c4ea006'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('recurring_group', 'amount',
               existing_type=mysql.DECIMAL(precision=19, scale=4),
               type_=sa.DECIMAL(precision=19, scale=2),
               existing_nullable=True)
    op.alter_column('transaction', 'amount',
               existing_type=mysql.DECIMAL(precision=19, scale=4),
               type_=sa.DECIMAL(precision=19, scale=2),
               existing_nullable=True)
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('transaction', 'amount',
               existing_type=sa.DECIMAL(precision=19, scale=2),
               type_=mysql.DECIMAL(precision=19, scale=4),
               existing_nullable=True)
    op.alter_column('recurring_group', 'amount',
               existing_type=sa.DECIMAL(precision=19, scale=2),
               type_=mysql.DECIMAL(precision=19, scale=4),
               existing_nullable=True)
    ### end Alembic commands ###
