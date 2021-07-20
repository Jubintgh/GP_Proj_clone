"""empty message

Revision ID: 1e76ef0c16d0
Revises: 
Create Date: 2021-07-20 09:20:34.170609

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e76ef0c16d0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('disciplines',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('discipline_name', sa.VARCHAR(length=20), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.VARCHAR(length=30), nullable=False),
    sa.Column('last_name', sa.VARCHAR(length=30), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('location', sa.VARCHAR(), nullable=False),
    sa.Column('gender', sa.Integer(), nullable=False),
    sa.Column('coach', sa.Boolean(), nullable=True),
    sa.Column('img_url', sa.VARCHAR(), nullable=True),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('answers',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('about', sa.Text(), nullable=True),
    sa.Column('weight_class', sa.VARCHAR(length=20), nullable=False),
    sa.Column('reach', sa.Integer(), nullable=False),
    sa.Column('professional_level', sa.VARCHAR(length=15), nullable=False),
    sa.Column('current_record', sa.VARCHAR(), nullable=True),
    sa.Column('previous_titles', sa.VARCHAR(), nullable=True),
    sa.Column('fav_rocky_fighter', sa.VARCHAR(), nullable=True),
    sa.Column('walkout_song', sa.VARCHAR(), nullable=True),
    sa.Column('vaccinated', sa.Boolean(), nullable=True),
    sa.Column('nickname', sa.VARCHAR(), nullable=True),
    sa.Column('religion', sa.VARCHAR(), nullable=True),
    sa.Column('offspring', sa.VARCHAR(), nullable=True),
    sa.Column('pets', sa.VARCHAR(), nullable=True),
    sa.Column('availability', sa.VARCHAR(), nullable=True),
    sa.Column('rate', sa.Integer(), nullable=True),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id')
    )
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('praiser_id', sa.Integer(), nullable=False),
    sa.Column('praised_id', sa.Integer(), nullable=True),
    sa.Column('display', sa.Boolean(), nullable=True),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['praised_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['praiser_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_discipline',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('discipline_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['discipline_id'], ['disciplines.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'discipline_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_discipline')
    op.drop_table('likes')
    op.drop_table('answers')
    op.drop_table('users')
    op.drop_table('disciplines')
    # ### end Alembic commands ###
